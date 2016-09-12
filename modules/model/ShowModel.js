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
 * —---------------------------------------------—
 * Codifica modulo, creazione del costruttore
 * =================================================
 * * 0.2.0         2016-08-18    Zamberlan Sebastiano
 * —---------------------------------------------—
 * Codifica Modulo, Inserimento dei metodi e degli
 * errori dove opportuno
 * =================================================
 * 1.0.0           2016-09-08    Roberto D'Amico
 * —---------------------------------------------—
 * Inserimento del metodo Render
 * =================================================
 */
import AttributeReader from '../utils/AttributeReader'
import {executeQuery} from '../utils/DSLICompiler'
import * as actions from '../actions/RootAction'
import DocumentVisualize from './DocumentVisualize'
import React from 'react'

class DocumentModel {
  constructor(id, parent) {
    this.rows = parent.getShowRows();
    this.populate = parent.getPopulateShow();
    this.query = this.buildQuery(id, parent.getName())

    this.flag = true;
    this.show = false ;
    this.storageResult = [];
    this.secondQuery = [];
    this.count =0;
    this.JSON;
    this.flag1=true;

  }

  buildQuery(id, model) {
    return "db.collection('" + model + "').find({_id:'" + id + "'})";
  }

  //Metodi get
  getCollection() {
    return this.collection;
  }

  getPopulate() {
    return this.populate;
  }

  getRows() {
    return this.rows;
  }

  DSLType() {
    return "document";
  }

  JSONbuild(result) {
    return {
      "properties": {
        "DSLType": this.DSLType(),
        "rows": this.rows
      },
      "data": {
        "result": result
      }
    };
  }

  render(store) {

    try{
      let token = this.guest || store.getState().loggedUser.token;
      var populate = this.populate
      if(this.flag){                                                              //EXECUTES ONCE
        this.flag = false;
        executeQuery(store.getState().currentDSLI, this.query, token, (err,res) =>{                                 //LAUNCH OF A QUERY
          if(err)                                                                 //CALLBACK FUNCTION WHERE QUERY ENDS
            this.err = err
          else
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
            executeQuery(store.getState().currentDSLI, populateQuery, token, (err,res) =>{            //SAME THING HERE
              if(err)                                                                 //CALLBACK FUNCTION WHERE QUERY ENDS
                this.err = err
              else
                this.secondQuery.push(Object.assign({}, res));
              store.dispatch(actions.refresh());
            });
          }
        }

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
      else if(this.storageResult && this.storageResult.length != 0){
        this.show = true;
        this.JSON=this.JSONbuild(this.storageResult);
      }
    }catch(exception){
      this.err = exception
    }

    if(this.err)
      return <div className="loading error">Error: {this.err.message.toString()}</div>
    else if (this.show)
      return <DocumentVisualize dsli = {store.getState().currentDSLI} JSON = {this.JSON}/>
    else
      return <div className="loading">Eseguendo le query ...</div>
  }
}

export default DocumentModel
