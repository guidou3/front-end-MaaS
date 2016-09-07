/*jshint esversion: 6 */
/*
 * Name : dashboard.js
 * FrontEnd::Model::DocumentModel
 * Location : /model/
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1           2016-08-13     Berselli Marco
 * 0.1.0           2016-08-18    Zamberlan Sebastiano
 * 0.1.1           2016-08-27    Zamberlan Sebastiano
 * -------------------------------------------------
 * Codifica modulo
 * =================================================
 */
import React, { Component, PropTypes } from 'react'
import request from 'superagent'
var AttributeReader = require('../utils/AttributeReader');
var MaasError = require("../utils/MaasError");

class DocumentModel extends Component{
  constructor(params, populate, bodyRows){
    super()
    var self = this;

    //Lettura Attributi Obbligatori
    AttributeReader.readRequiredAttributes(params, this, [
      "collection"
    ], function(param) {
      throw new MaasError(8000,
        "Required parameter '" + param + "' in document '" +
          self.toString() + "'");
    });

    this.query = "{}";

    //Lettura Attributi Opzionali
    AttributeReader.readOptionalAttributes(params, this, ["query"]);

    this.populate = [];

    //Lettura Attributi Opzionali all'interno di populate
    AttributeReader.readOptionalAttributes(populate, this, [
      "populate"]);

    //Assegnazione delle righe all'interno del parametro rows
    //this.rows = bodyRows;
    for(var i=0; i<bodyRows.length; i++)
    {
      AttributeReader.readRequiredAttributes(bodyRows[i],this.rows,
        ["label","name"], function(param){
        throw new MaasError(8000,
          "Required parameter '" + param + "' in document.rows '" +
            self.toString() + "'");
      });
    }

    //Lettura Attributi con Valore Vuoto
    AttributeReader.assertEmptyAttributes(params, function(param) {
      throw new MaasError(8000,
      "Unexpected parameter '" + param + "' in document '"
      + self.toString() + "'");
    });
  }

  //Metodi della Classe

  //Metodo Creazione Query
  buildQuery()
  {
    return "db.collection('" + this.collection + "').find("
     + this.query +")";
  }

  //Metodi get
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

  //Metodo
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
};

export default DocumentModel
//module.exports = DocumentModel
