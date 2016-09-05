 //import Parser from './Parser'
import {parse, expand, compile} from 'sweet.js'
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
var macro = require('includes!../../macro.sjs');
import cellModel from '../model/CellModel';
import collectionModel from '../model/CollectionModel';
import dashboardModel from '../model/DashboardModel';
import documentModel from '../model/DocumentModel';
import vm from 'vm';
//import clone from 'clone';
class PageBuilder extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.flag = true;
    this.flag1 =true;
    this.storageResult = [];
    this.sq = [];
    //this.x = this.deepCopy(this.storageResult);
    this.JSON;
    //let x="cell(label: 'prova', type : 'string', value : { collection : 'Account' , query : '{dutyId:{$gt: 2}},{password: 1}', sortby:'{subscribedAt: 1}' ,order:'asc' })";
    //let x="dashboard(  name: 'dragonball'){row{cell:'goku',collection:'saiyan',document:'mondi di Daragonball'},row{cell:'saiyan viventi'}}";
let x="collection(name:'DSL',label:'persone di età >=30/anzienda';id:'persona/azienda_collection';weight:0;){index(populate:[{path:'accountId',model:'Account'}]){column(label:'Id', name:'persona.id', sortable:true, selectable:true, transformation:{}),column(label:'Età Persona', name:'età', sortable:true, selectable:true, transformation:{}),column(label:'Nome Azienda', name:'azienda.nome', sortable:true, selectable:true, transformation:{})}show(populate:['path:azienda,model:azienda}']){row(label:'Nome Persona', name:'nome'),row(label:'Codice Fiscale', name:'CF'),row(label:'Età Persona', nome:'età'),row(label:'Nome Azienda', name:'azienda.nome'),row(label:'P.IVA Azienda', name:'azienda.PIVA')}}"; // dsli che verrà passata per parametro
    //let x="cell(label: 'vacca', type : 'string', value:{collection:'DSL'} )";
//let x="document(collection:'Account', name:'franco',label:'sora', id:'jejio', weight:0){show(populate:['{path:ciccio,model:ringhio}','{path:gianno,model:morandi}']){row(label:'xx', name:'vv'),row(label:'ff', name:'jj'),row(label:'kk', name:'hh')}}";
    let preCompileFile = macro + x;

    let compiledDSLI = compile(preCompileFile); //compilazione del preCompiledFile


    var obj = undefined;
    function insert(object){
     obj=object;
    }
      vm.runInNewContext(compiledDSLI.code, {insert:insert, require:require, cellModel:cellModel, dashboardModel:dashboardModel, collectionModel:collectionModel, documentModel:documentModel});
    this.object=obj;


  }

  render() {
    const { store } = this.context;
    var dsli = store.getState().currentDSLI;
    var DSLType = this.object.DSLType();
    if(DSLType == "cell"){
      if(this.object.valueIsQuery()){
        var query = this.object.buildQuery();
          if(this.flag){
            this.flag = false;
            store.dispatch(actions.execDSLI(dsli.id, query));
          }
          var JSON=this.object.JSONbuild(dsli.result);
      }
      else{
       var JSON =this.object.JSONbuild(this.object.buildQuery());
      }
    }
    if(DSLType == "collection"){
      var query = this.object.buildIndexQuery();
      console.log(query);
      var populate = this.object.getPopulateIndex();
      /*var obj = { a: 1 };
      var copia = Object.assign({}, obj);
      console.log(obj, copia); // { a: 1 }, { a: 1 }
      obj.a = 2;
      console.log(obj, copia); // { a: 2 }, { a: 1 }*/
      // recursive function to clone an object. If a non object parameter
// is passed in, that parameter is returned and no recursion occur
function deepCopy(oldObj) {
  var newObj = oldObj;
  if (oldObj && typeof oldObj === 'object') {
      newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
      for (var i in oldObj) {
          newObj[i] = deepCopy(oldObj[i]);
      }
  }
  return newObj;
}

      if(this.flag){
            this.flag = false;
          store.dispatch(actions.execDSLI(dsli.id, "db.collection('DSL').find()"));
           //this.storageResult= this.deepCopy(dsli.result);
           /*for(var i=dsli.result.length; i>0 ; i--){
             this.storageResult.push(dsli.result[i]);
             delete dsli.result[i];
           }
            dsl.result = [];*/
           //this.x=this.deepCopy(this.storageResult);
           this.storageResult=dsli.result;
            console.log(this.storageResult);

      }
       if(this.flag1){
         this.flag1=false;
      var collection = populate[0].model;
      var attribute = populate[0].path;
      var populateQuery = "db.collection('"+ collection +"').find()";
      console.log("populatelenght: "+populate.length, "populateQuery: "+populateQuery, "attribute: "+attribute);
      console.log("Egyey", this.storageResult);
      store.dispatch(actions.execDSLI(dsli.id, populateQuery));
      this.secondQuery=dsli.result;
      //for (var j=0; j<dsli.result.lenght; j++){
      //this.secondQuery = dsli.result[j];
    //}/
      console.log("secondQuery: ",this.secondQuery,"PP", this.storageResult);}
      /* if(this.flag1){
      if(populate){
      for(var i=0; i<populate.length; i++){
          var collection = populate[i].model;
          var attribute = populate[i].path;
          var populateQuery = "db.collection('"+ collection +"').find()";
          console.log("populatelenght: "+populate.length, "populateQuery: "+populateQuery, "attribute: "+attribute);
          store.dispatch(actions.execDSLI(dsli.id, populateQuery));
          var secondQuery = dsli.result;
          console.log("secondQuery: "+secondQuery);
          console.log("PP",this.storageResult, this.storageResult.length);
          /*for(var i=0; i<principalQuery.length; i++){
              var id = principalQuery[i][attribute];
              for(var j=0; j<secondQuery.length; j++){
                if(secondQuery[j]._id == id){
                  principalQuery[i][attribute] = secondQuery[j];
                  console.log("ppp: "+principalQuery[i][attribute], "scd: "+secondQuery[i]);
                  console.log("CCC", principalQuery);
                }
              }
            }
        }
        //this.JSON=this.object.JSONbuild(principalQuery);
      }
      else{
        //this.JSON=this.object.JSONbuild(principalQuery);
      }
      this.flag1=false;
    }*/
    //console.log("QQ",principalQuery)

      /*console.log("1",principalQuery,populate.length,this.flag1);
      var flag2 = true;
      if(populate){
          for(var i=0; i<populate.length; i++){
            flag2=true;
            var collection = populate[i].model;
            var attribute = populate[i].path;
            var queryPopulate = "db.collection('"+ collection +"').find()";
            console.log("2",collection,attribute,queryPopulate);
            store.dispatch(actions.execDSLI(dsli.id, query));
            var secondQuery = dsli.result;
            console.log("3",secondQuery,principalQuery.length,secondQuery.length);
            for(var i=0; i<principalQuery.length; i++){
                var id = principalQuery[i][attribute];
                for(var j=0; j<secondQuery.length; j++){
                  if(secondQuery[j]._id == id){
                    principalQuery[i][attribute] = secondQuery[j];
                  }
                  console.log("y",j,secondQuery[j]);
                }
              }
              console.log("22",principalQuery);
            }
            this.flag1=false;
          }*/
          //this.JSON = this.object.JSONbuild(principalQuery);
        //}
        //var JSON = this.object.JSONbuild(principalQuery);
        //console.log("BBBBBBBBBBBBBBBBBBBB",principalQuery);
        //console.log("EEEEEEEEEEEEE",this.JSON);
      //MAnca lo showModel
    }



 if(this.storageResult == undefined){
      return (
        <div>
          loading...
        </div>
      )
    }
    else{

      return (
    	  <div>
        {this.secondQuery.toString()}/{this.storageResult.toString()}
        </div>
    	)
    }
  }
  xxxg(c){
    return c;
  }


}
PageBuilder.contextTypes = {
  store : React.PropTypes.object
}

export default PageBuilder
