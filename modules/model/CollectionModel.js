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
 * —---------------------------------------------—
 * Codifica modulo
 * =================================================
 * * 0.2.0         2016-08-18    Zamberlan Sebastiano
 * —---------------------------------------------—
 * Codifica Modulo, Inserimento dei metodi
 * =================================================
 * * 0.3.0         2016-08-22    Zamberlan Sebastiano
 * —---------------------------------------------—
 * Inserimento degli errori
 * =================================================
 * 1.0.0           2016-09-08    Roberto D'Amico
 * —---------------------------------------------—
 * Inserimento del metodo Render
 * =================================================
 */
import AttributeReader from '../utils/AttributeReader'
import {executeQuery} from '../utils/DSLICompiler'
import * as actions from '../actions/RootAction'
import React, { Component, PropTypes } from 'react'
import CollectionVisualize from './CollectionVisualize'
import ShowModel from './ShowModel'

class CollectionModel {
  constructor(params, index, show) {

    AttributeReader.readRequiredAttributes(params,this,["param"],function(param){
      self.err = ("Required parameter '" + param + "' in collection '" + self.toString() + "'");
    });

    //Lettura Attributi con Valore Vuoto
    AttributeReader.assertEmptyAttributes(params,function(param){
      self.err = ("Unexpected parameter '" + param + "' in collection '" + self.toString() + "'");
    });

    //Lettura Attributi Obbligatori dentro l'attributo param
    AttributeReader.readRequiredAttributes(this.param,this,["name"],function(param){
      self.err = ("Required parameter '" + param + "' in collection '" + self.toString() + "'");
    });

    //Index
    this.param = [];
    this.columns = [];
    this.indexPopulate = this.populate;

    AttributeReader.readOptionalAttributes(index,this,["param","columns"]);

    AttributeReader.assertEmptyAttributes(index,function(param){
      self.err = ("Unexpected parameter '" + param + "' in collection.index '"+ self.toString() + "'");
    });

    this.populate = [];
    this.sortby = "{'_id': 1}";
    this.order = "asc";

    AttributeReader.readOptionalAttributes(this.param,this,["populate","sortby","order","query"]);
    //Show
    this.indexPopulate = this.populate;
    //Show
    AttributeReader.readOptionalAttributes(show,this,["populate","rows"]);

    this.flag = true;
    this.show = false ;
    this.storageResult = [];
    this.secondQuery = [];
    this.count =0;
    this.JSON = null;
    this.flag1 = true;

  }

  getName() {
    return this.name;
  }

  getIndexColumns() {
    return this.columns;
  }

  getShowRows() {
    return this.rows;
  }

  getPopulate() {
    return this.indexPopulate;
  }

  getPopulateShow() {
    return this.populate;
  }

  DSLType() {
    return "collection";
  }

  showJSONbuild(result){
    return {
      "properties":{
        "showRows":this.getShowRows()
      },
      "data":{
        "result":result
      }
    }
  }

  buildQuery(){
    var stringQuery = '{}';
    var query = "db.collection('" + this.name + "')";
    if(this.query){
      stringQuery = JSON.stringify(this.query);
      query = query + ".find(" + stringQuery + ")";
    }
    else
      query = query + ".find()";
    if(this.order == "desc")
      return query + ".sort(-" + this.sortby + ")";
    else
      return query + ".sort(" + this.sortby + ")";
    return query;
  }

  JSONbuild(result) {
    return {
      "properties":{"DSLType":this.DSLType(), "indexColumns":this.getIndexColumns(), "showRows":this.getShowRows(), "showPopulate":this.getPopulateShow()},
      "data":{"result":result}
    };
  }

  render(store) {
    try{
      let token = this.guest || store.getState().loggedUser.token;
      var populate = this.getPopulate();
      if(this.flag){
        this.flag = false;

        if(this.showID){
          this.showModel = new ShowModel(this.showID, this)
          this.showModel.guest = this.guest
        }
        else {
          var query = this.buildQuery();
          executeQuery(store.getState().currentDSLI, query, token, (err,res) =>{
            if(err)
              this.err = err
            else
              this.storageResult = Object.assign({}, res);
            store.dispatch(actions.refresh());
          });
        }
      }

      if(populate && this.storageResult.length != 0 && this.flag1){
        this.flag1 = false;
        for(var k =0; k< populate.length; k++){
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
          executeQuery(store.getState().currentDSLI, populateQuery, token, (err,res) =>{
            if(err)
              this.err = err
            else
              this.secondQuery.push(Object.assign({}, res));
            store.dispatch(actions.refresh());
          });
        }
      }

      if(populate.length != 0){
        if(this.storageResult && this.secondQuery && this.count == populate.length){
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
          if(this.storageResult.length != 0){
            this.show = true;
            this.JSON=this.JSONbuild(this.storageResult);
          }
        }
      }
      else if(this.storageResult && this.storageResult.length != 0){
        this.show = true;
        this.JSON=this.JSONbuild(this.storageResult);
      }

    }catch(exception){
      this.err = exception
    }

    if(this.err)
      return <div className="loading error">Error: {this.err.message.toString()}</div>
    else if(this.showModel)
      return this.showModel.render(store)
    else if(this.show)
      return <CollectionVisualize guest = {this.guest} dsli = {store.getState().currentDSLI} JSON = {this.JSON}/>
    else
      return <div className="loading">Eseguendo le query ...</div>
  }
}

export default CollectionModel
