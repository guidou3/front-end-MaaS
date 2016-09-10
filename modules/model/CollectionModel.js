/*jshint esversion: 6 */
/*
 * Name : CollectionModel.js
 * Location : ./modules/model/
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.1.0           2016-08-12     Berselli Marco
 * -------------------------------------------------
 * Codifica modulo
 * =================================================
 * * 0.2.0         2016-08-18    Zamberlan Sebastiano
 * -------------------------------------------------
 * Inserimento degli errori
 * =================================================
 * 1.0.0           2016-09-08    Roberto D'Amico
 * -------------------------------------------------
 * Inserimento del metodo Render
 * =================================================
 */
import AttributeReader from '../utils/AttributeReader'
import {executeQuery} from '../utils/DSLICompiler'
import * as actions from '../actions/RootAction'
import React from 'react'

class CollectionModel {
  constructor(params, index, show){
    //super()
    AttributeReader.assertEmptyAttributes(params,function(param){});//lancio dell'errore
    AttributeReader.readRequiredAttributes(params,this,["param"],function(param){});//lancio dell'errore
    AttributeReader.readRequiredAttributes(this.param,this,["name"],function(param){});//lancio dell'errore
    AttributeReader.assertEmptyAttributes(index,function(param){});//lancio dell'errore
    //Index
    this.param = [];
    this.columns = [];

    AttributeReader.readOptionalAttributes(index,this,["param","columns"]);
    this.populate = [];
    this.sortby = "{'_id': 1}";
    this.order = "asc";

    AttributeReader.readOptionalAttributes(this.param,this,["populate","sortby","order","query"]);
    this.indexPopulate = this.populate;
    //Show

    AttributeReader.readOptionalAttributes(show,this,["populate","rows"]);

    this.flag = true;
    this.flag1 = true;
    this.show = false ;
    this.storageResult = [];
    this.secondQuery = [];
    this.count =0;
    this.JSON;
    this.flag2 = true;
    this.storageResultShow = [];
    this.secondQueryShow = [];
    this.count1=0;
    this.flag3 =true;
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
  getPopulate(){
     return this.indexPopulate;
   }
  getPopulateShow(){
    return this.populate;
  }
  DSLType(){
    return "collection";
  }

  buildQuery(){
    var query = "db.collection('" + this.name + "')";
    if(this.query)
      query = query + ".find(" + this.query + ")";
    else
      query = query + ".find()";
    if(this.order == "desc")
      return query + ".sort(-" + this.sortby + ")";
    else
      return query + ".sort(" + this.sortby + ")";
    return query;
  }

  buildShowQuery(id,store){
    var query = "db.collection('" + this.name + "').find({_id:'" + id + "'})";
    if(this.flag2){
      this.flag2=false
      executeQuery(store.getState().currentDSLI, query, store.getState().loggedUser.token, (err,res) =>{                                 //LAUNCH OF A QUERY
        if(err)                                                                 //CALLBACK FUNCTION WHERE QUERY ENDS
          return;
        this.storageResultShow = Object.assign({}, res);
        store.dispatch(actions.refresh());                                      //CALL RENDER TO DISPLAY DATA
      });
    }
    if(this.populate && Object.keys(this.storageResultShow).length != 0 && this.flag3){
      this.flag3=false;
      for(var k =0; k< this.populate.length; k++){

        let collection = this.populate[k].model;
        let attribute = this.populate[k].path;
        var id = this.storageResultShow[0][attribute];
        var queryP = "db.collection('" + collection + "').find({_id:'" + id +"'})";
        executeQuery(store.getState().currentDSLI, queryP, store.getState().loggedUser.token, (err,res) =>{                                 //LAUNCH OF A QUERY
          if(err)                                                                 //CALLBACK FUNCTION WHERE QUERY ENDS
            return;
            this.secondQueryShow.push(Object.assign({}, res));
          store.dispatch(actions.refresh());                                      //CALL RENDER TO DISPLAY DATA
        });
        this.count1 ++;
      }
    }
    if(Object.keys(this.secondQueryShow).length == this.count1){
        for(var k=0; k<Object.keys(this.secondQueryShow).length; k++){
          var attribute = this.populate[k].path;
           for(var i=0; i<Object.keys(this.storageResultShow).length; i++){
            var id = this.storageResultShow[i][attribute];
            for(var j=0; j<Object.keys(this.secondQueryShow[k]).length; j++){
              if(this.secondQueryShow[k][j]._id == id){
                this.storageResultShow[i][attribute] = this.secondQueryShow[k][j];
              }
            }
          }
        }
      }
    console.log("STORAGERESULTSHOW",this.storageResultShow, "SECONDQUERYSHOW",this.secondQueryShow);
  }

  JSONbuild(result){
    return {
      "properties":{"DSLType":this.DSLType(), "indexColumns":this.getIndexColumns(), "showRows":this.getShowRows(), "showPopulate":this.getPopulateShow()},
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
      });}
      ///DA COPIARE PER DOCUMENT
      if(populate && this.storageResult.length != 0 && this.flag1){
        this.flag1 = false;
        for(var k =0; k< populate.length; k++){
          console.log(populate.length)
          this.count ++;
          var collection = populate[k].model;
          var attribute = populate[k].path;
          var populateQuery = "db.collection('" + collection +"').find({_id: {$in:['";
          for(let i=0; i<Object.keys(this.storageResult).length ; i++){
            if(this.storageResult[i][attribute]){
            if(i == (Object.keys(this.storageResult).length-1)){
              populateQuery = populateQuery + this.storageResult[i][attribute] +"']}})";
            }
            else{
              populateQuery = populateQuery + this.storageResult[i][attribute] +"','";
            }
          }

          }
          executeQuery(store.getState().currentDSLI, populateQuery, store.getState().loggedUser.token, (err,res) =>{            //SAME THING HERE
            if(err)
              return;
            this.secondQuery.push(Object.assign({}, res));
            store.dispatch(actions.refresh());
          });

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
    else{
      return <div>Ciao, sono una COLLECTION!</div>;
    }                                     //RENDER CODE HERE, DATI IN JSON
  }
}

export default CollectionModel
