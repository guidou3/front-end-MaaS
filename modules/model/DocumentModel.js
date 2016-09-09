/*jshint esversion: 6 */
/*
 * Name : dashboard.js
 * Location : /model/
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1           2016-08-13     Berselli Marco
 * 0.1.0           2016-08-18    Zamberlan Sebastiano
 * -------------------------------------------------
 * Codifica modulo
 * =================================================
 */

import AttributeReader from '../utils/AttributeReader'
import {executeQuery} from '../utils/DSLICompiler'
import * as actions from '../actions/RootAction'
import React from 'react'

class DocumentModel {
  constructor(params, populate, bodyRows)
  {
    AttributeReader.assertEmptyAttributes(params, function(param) {}); //da inserire l'errore
    AttributeReader.readRequiredAttributes(params, this, [
      "collection", "name"
    ], function(param) {}); //lancio errore
    this.query = "{}";
    AttributeReader.readOptionalAttributes(params, this, [
        "query"
      ], function(param) {}) // lancio errore
    this.populate = [];
    AttributeReader.readOptionalAttributes(populate, this, [
      "populate"
    ]);
    this.rows = bodyRows;
    this.flag = true;
    this.show = false ;
    this.storageResult = [];
    this.secondQuery = [];
    this.count =0;
    this.JSON;
  }

  buildQuery()
  {
    return "db.collection('" + this.collection + "').find(" + this.query +
      ")";
  }

  getCollection()
  {
    return this.collection;
  }
  getName()
  {
    return this.name;
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
      "proprierties":
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
      return <div>Ciao, sono un DOCUMENT!</div>                                       //RENDER CODE HERE, DATI IN JSON
  }
}

export default DocumentModel
