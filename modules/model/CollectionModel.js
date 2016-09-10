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

import React, { Component, PropTypes } from 'react'
import request from 'superagent'
var AttributeReader = require('../utils/AttributeReader');
var MaasError = require("../utils/MaasError");

class CollectionModel extends Component{
  constructor(params, index, show){
    super()
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
}
//module.exports = CollectionModel;
export default CollectionModel
