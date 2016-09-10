/*jshint esversion: 6 */
/*
 * Name : dashboard.js
 * FrontEnd::Model::DashboardModel
 * Location : /model/
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1           2016-08-13    Zamberlan Sebastiano
 * 0.1.0           2016-08-18    Berselli Marco
 * 0.1.1           2016-08-27    Berselli Marco
 * 0.1.2           2016-08-30    Zamberlan Sebastiano
 * 0.1.3           2016-09-02    Zamberlan Sebastiano
 * -------------------------------------------------
 * Codifica modulo
 * =================================================
 */
import MaasError from "../utils/MaasError";
import AttributeReader from '../utils/AttributeReader'
import {executeQuery} from '../utils/DSLICompiler'
import * as actions from '../actions/RootAction'
import React from 'react'


class CollectionModel {
  constructor(params, index, show){
    var self = this;

    //Index
    this.param = [];
    this.columns = [];

    //Lettura Attributi Obbligatori
    AttributeReader.readRequiredAttributes(params,this,[
      "param"],function(param){
        throw new MaasError(8000,
          "Required parameter '" + param + "' in collection '" +
            self.toString() + "'");
      });

    //Lettura Attributi con Valore Vuoto
    AttributeReader.assertEmptyAttributes(params,function(param){
      throw new MaasError(8000,
      "Unexpected parameter '" + param + "' in collection '"
      + self.toString() + "'");
      });

    //Lettura Attributi Obbligatori dentro l'attributo param
    AttributeReader.readRequiredAttributes(this.param,this,[
      "name"],function(param){
        throw new MaasError(8000,
        "Required parameter '" + param + "' in collection '" +
          self.toString() + "'");
      });

    this.populate = [];
    this.sortby = "{'_id': 1}";
    this.order = "asc";

    //Lettura Attributi Opzionali dentro l'attributo param
    AttributeReader.readOptionalAttributes(this.param,this,[
      "populate","sortby","order","query"]);

    this.indexPopulate = this.populate;

    //Lettura Attributi Opzionali dentro index
    AttributeReader.readOptionalAttributes(index,this,[
      "param","columns"]);

    //Lettura Attributi con Valore Vuoto  dentro index
    AttributeReader.assertEmptyAttributes(index,function(param){
      throw new MaasError(8000,
      "Unexpected parameter '" + param + "' in collection.index '"
      + self.toString() + "'");
    });

    //Show
    AttributeReader.readOptionalAttributes(show,this,[
      "populate","rows"]);
  }

  getName(){
    return this.name;
  }

  getIndexColumns(){
    return this.columns;
  }
  getShowRows(){
    return this.rows;
  }

  buildIndexQuery(){
    var query = "db.collection('" + this.name + "')";
    if(this.query){
      query = query + ".find(" + this.query + ")";
    }
    else{
      query = query + ".find()";
    }
    if(this.order == "desc")
    {
      return query + ".sort(-" + this.sortby + ")";
    }
    else
    {
      return query + ".sort(" + this.sortby + ")";
    }
    return query;
  }

  //Metodi della Classe

  //Metodi Get
  getPopulateIndex(){
     return this.indexPopulate;
   }

  getPopulateShow(){
    return this.populate;
  }
  //Metodo Creazione Query di Show
  buildShowQuery(id){
    var query = "db.collection(" + this.name +
    ").find({_id:" + id + "})";

    return query;
  }

  //Metodo di specifica del tipo di DSL
  DSLType(){
    return "collection";
  }

  //Metodo per la costruzione del JSON risultante
  JSONbuild(result){
    return {
      "properties":{"DSLType":this.DSLType(),
      "indexColumns":this.getIndexColumns(),
      "showRows":this.getShowRows(),
      "showPopulate":this.getPopulateShow()},
      "data":{"result":result}
    };
  }
  render(store){
    var populate = this.getPopulate();
    if(this.flag){                                                              //EXECUTES ONCE
      this.flag = false;
      var query = this.buildQuery();
      executeQuery(store.getState().currentDSLI, query, store.getState().loggedUser.token, (err,res) =>{                                 //LAUNCH OF A QUERY
        if(err)                                                                 //CALLBACK FUNCTION WHERE QUERY ENDS
          return;
        this.storageResult = Object.assign({}, res);
        store.dispatch(actions.refresh());                                      //CALL RENDER TO DISPLAY DATA
      });
      if(populate){
        for(var k =0; k< populate.length; k++){
          this.count ++;
          var collection = populate[k].model;

          var populateQuery = "db.collection('"+ collection +"').find()";
          executeQuery(store.getState().currentDSLI, populateQuery, store.getState().loggedUser.token, (err,res) =>{            //SAME THING HERE
            if(err)
              return;
            this.secondQuery.push(Object.assign({}, res));
            store.dispatch(actions.refresh());
          });
        }
      }
    }

    if(this.count != 0){
      if(this.storageResult && this.secondQuery && this.count == Object.keys(this.secondQuery).length){                           //SET SHOW TO TRUE WHEN DATA IS READY
        this.show = true;
        for(var k=0; k<Object.keys(this.secondQuery).length; k++){
          var attribute = populate[k].path;
           for(var i=0; i<Object.keys(this.storageResult).length; i++){
            var id = this.storageResult[i][attribute];
            for(var j=0; j<Object.keys(this.secondQuery[k]).length; j++){
              if(this.secondQuery[k][j]._id == id){
                this.storageResult[i][attribute] = this.secondQuery[k][j];
              }
            }
          }
        }
        this.JSON=this.JSONbuild(this.storageResult);
      }
    }
    else if(this.storageResult){
      this.show = true;
      this.JSON=this.JSONbuild(this.storageResult);
    }

    if(!this.show)
      return <div>Eseguendo le query ...</div>
    else
      return <div>Ciao, sono una COLLECTION!</div>                                       //RENDER CODE HERE, DATI IN JSON
  }
}

export default CollectionModel
