/*
 * Name : cell.js
 * Module : Back-end::lib::Model::cell
 * Location : /model/
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1           2016-07-12     Zamberlan Sebastiano
 * -------------------------------------------------
 * Codifica modulo
 * =================================================
 */

 /*jshint esversion: 6 */

import AttributeReader from '../utils/AttributeReader'
import {executeQuery} from '../utils/DSLICompiler'
import * as actions from '../actions/RootAction'
import CellVisualize from './CellVisualize'
import React from 'react'

class CellModel {
   constructor(params){
     this.flag = true;
     this.show = false ;
     this.storageResult = [];
     this.JSON;

     this.label = undefined;
     AttributeReader.assertEmptyAttributes(params, function() {}); // da inserire l'errore
     AttributeReader.readRequiredAttributes(params, this, ["label","type","value"], function(param){
       if (param == "type")
       {
         //throw new typeError.error();
       }
       if (param == "value")
       {
         //throw a value error
       }
     });

     if (typeof this.value == "object")
     {
       AttributeReader.assertEmptyAttributes(this.value, function() {});
       AttributeReader.readRequiredAttributes(this.value, this, ["collection"], function() {}); //da inserire l'errore
       this.sortby = "{'_id': 1}";
       this.order = "asc";
       this.count = false;
       AttributeReader.readOptionalAttributes(this.value, this, [
         "query", "sortby", "order", "count"
       ]);
     }
     if (typeof this.value != "string" && typeof this.value != "number")
     {
       //lancia errore
     }
  }

  getLabel(){
    return this.label;
  }
  getType(){
    return this.type;
  }

  buildQuery(){
    if (typeof this.value == "string" || typeof this.value == "number")
      return this.value;
    else
    {
      if (typeof this.value == "object")
      {
        var findQuery = "db.collection('"+this.collection+"')";
        if(this.query)
          findQuery=findQuery + ".find(" + this.query +")";
        else
          findQuery=findQuery + ".find()";
        if(this.order == "desc")
          var completeQuery = findQuery + ".sort(-" + this.sortby + ").limit(1)";
        else
          var completeQuery =  findQuery + ".sort(" + this.sortby + ").limit(1)";
        if(this.count == true && typeof this.count == "boolean")
          return "db.collection('"+this.collection+"').aggregate([{ $match:"+this.query+" },{ $group: { _id: null, count: { $sum: 1 } } }])";
        else
          return completeQuery;
      }
    }
  }

  DSLType(){
    return "cell";
  }
  JSONbuild(queryResult){
    return { "properties":{"label":this.label, "DSLType": this.DSLType(), "returnType":this.getType()}, "data":{"result":queryResult}};
  }
  valueIsQuery(){
    if(typeof this.value == "object"){
      return true;
    }
    else{
      return false;
    }
  }

  render(store){
    if(this.valueIsQuery()){
      var query = this.buildQuery();
      if(this.flag){
        this.flag = false;
        executeQuery(store.getState().currentDSLI, query, store.getState().loggedUser.token, (err,res) =>{                               //LAUNCH OF A QUERY
          if(err)                                                                 //CALLBACK FUNCTION WHERE QUERY ENDS
          return;
          console.log(res);
          this.storageResult = Object.assign({}, res);
          store.dispatch(actions.refresh());                                      //CALL RENDER TO DISPLAY DATA
        });
      }
      if(this.storageResult.length != 0){
        console.log("MODEL");
        this.show = true;
        this.JSON=this.JSONbuild(this.storageResult);
      }
    }
    else if(this.storageResult){
      console.log("VANILLA");
      this.show = true;
      this.JSON=this.JSONbuild(this.storageResult);
    }

    if(this.show){
      return <CellVisualize dsli = {store.getState().currentDSLI} JSON = {this.JSON}/>
    }
    else
      return <div>Eseguendo le query ...</div>
  }
}

export default CellModel
