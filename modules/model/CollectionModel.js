//import React, { Component, PropTypes } from 'react'
var AttributeReader = require("../utils/AttributeReader");
class CollectionModel /*extends Component*/{
  constructor(params, index, show){
    //super()
    AttributeReader.assertEmptyAttributes(params,function(param){});//lancio dell'errore
    AttributeReader.readRequiredAttributes(params,this,["param"],function(param){});//lancio dell'errore
    AttributeReader.readRequiredAttributes(this.param,this,["name"],function(param){});//lancio dell'errore
    AttributeReader.assertEmptyAttributes(index,function(param){});//lancio dell'errore
    //Index
    this.param = [];
    this.columns = [];
    AttributeReader.readOptionalAttributes(index,this,["param","columns"]);
    this.populate = [];
    this.sortby = "{'_id': 1}";
    this.order = "asc";
    AttributeReader.readOptionalAttributes(this.param,this,["populate","sortby","order","query"]);
    this.indexPopulate = this.populate;
    //Show
    AttributeReader.readOptionalAttributes(show,this,["populate","rows"]);

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
  buildQuery(){ //non sono sicuro di come funzioni page ma teoricamente serve per indicare in che pagina si è spostati
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
  getPopulate(){
     return this.indexPopulate;
   }
  getPopulateShow(){
    return this.populate;
  }
  buildShowQuery(id){
    var query = "db.collection(" + this.name + ").find({_id:" + id + "})";
    return query;
  }
  DSLType(){
       return "collection";
     }
  JSONbuild(result){
    return {
      "properties":{"DSLType":this.DSLType(), "indexColumns":this.getIndexColumns(), "showRows":this.getShowRows(), "showPopulate":this.getPopulateShow()},
      "data":{"result":result}
    };
  }
}
module.exports = CollectionModel;
//export default cell
