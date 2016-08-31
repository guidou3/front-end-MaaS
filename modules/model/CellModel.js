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
 var AttributeReader = require('../utils/AttributeReader');
 //var typeError = require("/utils/TypeError");
 class CellModel extends Component{
   constructor(params){
     super()
     this.label = undefined;
     AttributeReader.assertEmptyAttributes(params, function() {}); // da inserire l'errore
     AttributeReader.readRequiredAttributes(params, this, ["type",
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
       this.sortby = "id";
       this.order = "asc";
       AttributeReader.readOptionalAttributes(this.value, this, [
         "query", "sortby", "order"
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

     setLabel(label){
       this.label = label;
     }

     getType(){
       return this.type;
     }

     returnData(){
       if (typeof this.value == "string" || typeof this.value ==
         "number")
       {
         return this.value;
       }
       else
       {
         if (typeof this.value == "object")
         {
           var findQuery = "db."+this.collection+".find("+ this.query +").limit(1).skip(0)";
           if(this.order == "asc")
           {
             return findQuery + ".sort(" + this.sortby + ")";
           }
           else if(this.order == "desc")
           {
             return findQuery + ".sort(-" + this.sortby + ")";
           }
         }
       }
     }
   };
export default CellModel
