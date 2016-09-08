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
 import React, { Component, PropTypes } from 'react'
 import request from 'superagent'
 var AttributeReader = require('../utils/AttributeReader');
 //var typeError = require("/utils/TypeError");
 class CellModel extends Component{
   constructor(params){
     super()
     this.label = undefined;
     AttributeReader.assertEmptyAttributes(params, function() {}); // da inserire l'errore
     AttributeReader.readRequiredAttributes(params, this, ["label","type",
       "value"
     ], function(param)
     {
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
       AttributeReader.readRequiredAttributes(this.value, this, [
         "collection"
       ], function() {}); //da inserire l'errore
       this.sortby = "{'_id': 1}";
       this.order = "asc";
       this.count = false;
       AttributeReader.readOptionalAttributes(this.value, this, [
         "query", "sortby", "order", "count"
       ]);
     }
     if (typeof this.value != "string" && typeof this.value !=
       "number")
     {
       //lancia errore
     }
     }
     //Manca ancora da fare l'id

     getLabel(){
       return this.label;
     }

     getType(){
       return this.type;
     }

     buildQuery(){
       if (typeof this.value == "string" || typeof this.value ==
         "number")
       {
         //console.log(this.value);
         return this.value;
       }
       else
       {
         if (typeof this.value == "object")
         {
           var findQuery = "db.collection('"+this.collection+"')";
           if(this.query){
             findQuery=findQuery + ".find(" + this.query +")";
           }
           else{
             findQuery=findQuery + ".find()";
           }
           if(this.order == "desc")
           {
             var completeQuery = findQuery + ".sort(-" + this.sortby + ").limit(1)";
           }
           else
           {
             var completeQuery =  findQuery + ".sort(" + this.sortby + ").limit(1)";
           }
           if(this.count == true && typeof this.count == "boolean")
           {
              return "db.collection('"+this.collection+"').aggregate([{ $match:"+this.query+" },{ $group: { _id: null, count: { $sum: 1 } } }])";
           }
           else {
             return completeQuery;
           }
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


   };
export default CellModel
