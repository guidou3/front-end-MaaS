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

//import React, { Component, PropTypes } from 'react'
var AttributeReader = require('../utils/AttributeReader');

class DocumentModel /*extends Component*/
{
  constructor(params, populate, bodyRows)
  {
    //super()
    AttributeReader.assertEmptyAttributes(params, function(param) {}); //da inserire l'errore
    AttributeReader.readRequiredAttributes(params, this, [
      "collection", "name"
    ], function(param) {}); //lancio errore
    this.populate = [];
    AttributeReader.readOptionalAttributes(populate, this, [
      "populate"
    ]);
    this.rows = bodyRows;
  }
  buildQuery()
  {
    return "db.collection(" + this.collection + ").find()";
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
  JSONbuild(
    return)
  {
    return {
      "proprierties":
      {
        "DSLType": this.DSLType(),
        "rows": this.rows
      },
      "data":
      {
        "return": return
      }
    };
  }
};
//export default DocumentModel
module.exports = DocumentModel
