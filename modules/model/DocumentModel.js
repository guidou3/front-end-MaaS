/*jshint esversion: 6 */
/*
 * Name : DocumentModel.js
 * Location : ./modules/model/
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.1.0           2016-08-13     Berselli Marco
 * Codifica Modulo, Inserimento dei metodi e degli
 * errori dove opportuno
 * =================================================
 * 1.0.0           2016-09-08    Roberto D'Amico
 * Inserimento del metodo Render
 * =================================================
 */
import AttributeReader from '../utils/AttributeReader'
import {executeQuery} from '../utils/DSLICompiler'
import * as actions from '../actions/RootAction'
import DocumentVisualize from './DocumentVisualize'
import MaasError from '../utils/MaasError'
import React from 'react'

class DocumentModel {
  constructor(params, populate, bodyRows)
  {
    var self = this;
    //Lettura Attributi Obbligatori
    AttributeReader.readRequiredAttributes(params, this, [
      "collection"
    ], function(param) {
      throw new MaasError(8000,
        "Required parameter '" + param + "' in document '" +
          self.toString() + "'");
    });

    //Lettura Attributi Opzionali
    AttributeReader.readOptionalAttributes(params, this, ["query"]);


    //Lettura Attributi Opzionali all'interno di populate
    AttributeReader.readOptionalAttributes(populate, this, [
      "populate"]);

      //Assegnazione delle righe all'interno del parametro rows
      //this.rows = bodyRows;
      /*self = this.rows;
      var arrayRow = {};
      for(var i=0; i<bodyRows.length; i++)
      {
        AttributeReader.readRequiredAttributes(bodyRows[i],arrayRow,
          ["label","name"], function(param){
          throw new MaasError(8000,
            "Required parameter '" + param + "' in document.rows '");
        });
      }*/

    this.rows = bodyRows;
    this.flag = true;
    this.show = false ;
    this.storageResult = [];
    this.secondQuery = [];
    this.count =0;
    this.JSON;
    this.flag1=true;
  }
  //Metodi della Classe

  //Metodo Creazione Query
  buildQuery()
  {
    var stringQuery = '{}';
    if(this.query)
      stringQuery = JSON.stringify(this.query);
    return "db.collection('" + this.collection + "').find(" + stringQuery +
      ")";
  }

  //Metodi get
  getCollection()
  {
    return this.collection;
  }
  getPopulate()
  {
    return this.populate;
  }
  getRows()
  {
    return this.rows;
  }

  DSLType()
  {
    return "document";
  }
  JSONbuild(result)
  {
    return {
      "properties":
      {
        "DSLType": this.DSLType(),
        "rows": this.rows
      },
      "data":
      {
        "result": result
      }
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
      if(populate && this.storageResult.length != 0 && this.flag1){
        this.flag1 = false;
        for(var k =0; k< populate.length; k++){
          this.count ++;
          var collection = populate[k].model;
          var attribute = populate[k].path;
          var populateQuery = "db.collection('" + collection +"').find({_id: {$in:['";
          for(var i=0; i<Object.keys(this.storageResult).length ; i++){
            if(this.storageResult[i][attribute]){
            if(i == (Object.keys(this.storageResult).length-1)){
              populateQuery = populateQuery + this.storageResult[i][attribute] +"']}})";
            }
            else{
              populateQuery = populateQuery + this.storageResult[i][attribute] +"','";
            }
          }
          }
          console.log(populateQuery);
          executeQuery(store.getState().currentDSLI, populateQuery, store.getState().loggedUser.token, (err,res) =>{            //SAME THING HERE
            if(err)
              return;
            this.secondQuery.push(Object.assign({}, res));
            console.log("RES",res);
            store.dispatch(actions.refresh());
          });

        }
      }

console.log("ST",this.storageResult,"SQ",this.secondQuery);
    if(populate.length != 0){
      if(this.storageResult && this.secondQuery && this.count == populate.length){                           //SET SHOW TO TRUE WHEN DATA IS READY
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
    else if(this.storageResult){
      this.show = true;
      this.JSON=this.JSONbuild(this.storageResult);
    }

    if(this.show){
      return <DocumentVisualize dsli = {store.getState().currentDSLI} JSON = {this.JSON}/>
    }
    else
      return <div>Eseguendo le query ...</div>
  }
}

export default DocumentModel
