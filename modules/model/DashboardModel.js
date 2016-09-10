/*
* Name : DashboardModel.js
* Location : ./modules/model/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-13     Berselli Marco
* -------------------------------------------------
* Codifica modulo
* =================================================
* 0.2.0           2016-08-22     Berselli Marco
* -------------------------------------------------
* Modifia dei metodi matrix e JSONbuild
* =================================================
* 1.0.0           2016-09-08     Roberto D'Amico
* -------------------------------------------------
* Inserimento del metodo Render
* =================================================
*/
import React, { Component, PropTypes } from 'react'
var AttributeReader = require("../utils/AttributeReader");
class DashboardModel extends Component {
  constructor(params,body){
  super()
  AttributeReader.assertEmptyAttributes(params,function(){});//da inserire l'errore
  AttributeReader.readRequiredAttributes(params,this,["label"],function(){});//lancio errore
  this.rows = [];
  this.labelRows = [];
  this.typeRows = [];
  this.dsliRows = [];
  for (var i=0; i<body.length; i++){
    var bodyRow = body[i];
    //console.log(bodyRow);
    var dashboardRow =  this.createColumn(bodyRow);
    this.rows.push(dashboardRow);
  }
}

createColumn(bodyRow){ //Serve solamente al costruttore
  var row = [];
  for(var key in bodyRow){
    var br={};
    AttributeReader.assertEmptyAttributes(bodyRow[key],function(){});
    AttributeReader.readRequiredAttributes(bodyRow[key],br,["label","dsl"],function(){});

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
  return {"labelRows":this.labelRows,"typeRows":this.typeRows, "dslRows":this.dsliRows};
}

DSLType(){
  return "dashboard";
}

JSONbuild(){
 return {
  "properties":{"DSLType": this.DSLType(), "rows": this.rows}
 }
}
}
export default DashboardModel
