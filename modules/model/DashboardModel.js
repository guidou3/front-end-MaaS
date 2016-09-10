/*jshint esversion: 6 */
/*
* Name : dashboard.js
* Module : FrontEnd::Model::DashboardModel
* Location : /model/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.0.1           2016-08-13     Berselli Marco
* 0.0.2           2016-08-25    Zamberlan Sebastiano
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import AttributeReader from "../utils/AttributeReader";
import * as actions from '../actions/RootAction'
import MaasError  from "../utils/MaasError";

class DashboardModel extends Component {
  constructor(params,body){
    super()
    var self = this;

    //Lettura Attributi Obbligatori
    AttributeReader.readRequiredAttributes(params,this,[
      "label"],function(param){
        throw new MaasError(8000,
          "Required parameter '" + param + "' in dashboard '" +
            self.toString() + "'");
      });
    //Lettura Attributi con Campo Vuoto
    AttributeReader.assertEmptyAttributes(params,function(param){
      throw new MaasError(8000,
        "Unexpected parameter '" + param + "' in dashboard '" +
          self.toString() + "'");
    });

    this.rows = [];
    this.labelRows = [];
    this.typeRows = [];
    this.dsliRows = [];

    for (var i=0; i<body.length; i++){
      var bodyRow = body[i];
      var dashboardRow =  this.createColumn(bodyRow);
      this.rows.push(dashboardRow);
  }
}

  createColumn(bodyRow){
    var row = [];
    for(var key in bodyRow){
      var br={};



      AttributeReader.readRequiredAttributes(bodyRow[key],br,[
        "label","dsl"],function(param){
          throw new MaasError(8000,
          "Required parameter '" + param + "' in dashboard.bodyRow'"
          + self.toString() + "'");
        });

      AttributeReader.assertEmptyAttributes(bodyRow[key],
        function(param){
          throw new MaasError(8000,
          "Unexpected parameter '" + param + "' in dashboard.bodyRow'"
           + self.toString() + "'");
      });

    var column= {label:br.label, type:key, dsl:br.dsl};
    row.push(column);
  }
  return row;
}

getLabel(){
   return this.label;
}

//metodo che ritorna le righe
matrix() {
  for(var i=0; i<this.rows.length; i++){
    var labelColumn = [];
    var typeColumn = [];
    var dsliColumn = [];
    for(var j=0; j<this.rows[i].length; j++){
      labelColumn.push(this.rows[i][j].label);
      typeColumn.push(this.rows[i][j].type);
      dsliColumn.push(this.rows[i][j].dsl);
    }
    this.labelRows.push(labelColumn);
    this.typeRows.push(typeColumn);
    this.dsliRows.push(dsliColumn);
   }

  return {
    "labelRows":this.labelRows,
    "typeRows":this.typeRows,
    "dslRows":this.dsliRows};
  }

//Metodo di specifica del tipo di DSL
DSLType(){
  return "dashboard";
}

//Metodo per la costruzione del JSON risultante
JSONbuild(){
 return {
  "properties":{"DSLType": this.DSLType(), "rows": this.rows}
};
}
}
export default DashboardModel
