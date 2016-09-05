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
class DashboardModel {
  constructor(params,body){
  AttributeReader.assertEmptyAttributes(params,function(){});//da inserire l'errore
  AttributeReader.readRequiredAttributes(params,this,["name"],function(){});//lancio errore
  this.rows = [];
  for (var i=0; i<body.length; i++){
    var bodyRow = body[i];
    var dashboardRow =  this.createColumn(bodyRow);
    this.rows.push(dashboardRow);
  }
}

createColumn(bodyRow){ //Serve solamente al costruttore
  var row = [];
  for(var key in bodyRow){
    var column= {label:bodyRow[key], type:key};
    row.push(column);
  }
  return row;
}

getQuery(labelName) { //cerca la label nella dashboard e se la trova restituisce una query
  for(var i=0; i<this.rows.length; i++){
    for(var j=0; j<this.rows[i].length; j++){
      for(var key in this.rows[i][j]){
        if(this.rows[i][j][key] == labelName && key == "label"){
           return "db.collection.find{label:" + labelName +"}";
        }
      }
    }
  }
  //lancio un errore

}
getLabel(){
   return this.name;
}
//metodo che ritorna le righe
labelmatrix() {
  var labelRows = [];
  for(var i=0; i<this.rows.length; i++){
    var labelColumn = [];
    for(var j=0; j<this.rows[i].length; j++){
      for(var key in this.rows[i][j]){
        if(key == "label"){
          labelColumn.push(this.rows[i][j][key]);
        }
      }
    }
    labelRows.push(labelColumn);
  }
  return labelRows;
}
//motodo che ritorna il tipo in base alle dato
getType(labelName) {
  for(var i=0; i<this.rows.length; i++){
    for(var j=0; j<this.rows[i].length; j++){
      var found=false;
      for(var key in this.rows[i][j]){
        if(found){
          return this.rows[i][j][key];
        }
        if(this.rows[i][j][key] == labelName && key == "label"){
           found=true;
        }
      }
    }
  }
  //lancio l'errore
}
}
module.exports = DashboardModel;
