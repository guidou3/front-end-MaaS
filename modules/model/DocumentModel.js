/*jshint esversion: 6 */
/*
* Name : dashboard.js
* Module : Back-end::lib::Model::dashboard
* Location : /model/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.0.1           2016-08-13     Berselli Marco
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
var AttributeReader = require("../utils/AttributeReader");
//var showModel = require("./showModel");
class DocumentModel{
  constructor(params,populate,bodyRows){
   AttributeReader.assertEmptyAttributes(params,function(){});//da inserire l'errore
   AttributeReader.readRequiredAttributes(params,this,["collection","name"],function(){});//lancio errore
   this.rows = bodyRows;
   this.LabelRows = [];
   this.NameRows = [];
   this.createRows();
   console.log(this.LabelRows,this.NameRows);
}
buildQuery(){
  return "db." + this.collection + ".find({label:" + this.name + "}";
}
createRows(){
  for(var i =0; i<this.rows.length; i++){
    console.log(this.rows[i]);
    var x = [];
    AttributeReader.readRequiredAttributes(this.rows[i],x,["label","name"],function(){});
    console.log(x.name);
    //this.LabelRows.push(x.label);
    //this.NameRows.push(x.name);


  }
}
getName() {
  return this.name;
}
getShow(){
  return this.show;
}
}
module.exports = DocumentModel;
