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

class PageBuilder extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.flag = true;
    this.flag1 =true;

    let x="cell(label: 'prova', type : 'string', value : { collection : 'Account' , query : '{dutyId:{$gt: 2}},{password: 1}', sortby:'{subscribedAt: 1}' ,order:'asc' })";
    //let x="dashboard(  name: 'dragonball'){row{cell:'goku',collection:'saiyan',document:'mondi di Daragonball'},row{cell:'saiyan viventi'}}";
//let x="collection(name:'Account',label:'persone di età >=30/anzienda';id:'persona/azienda_collection';weight:0;){index(populate:[{path:'_id',model:'Account'}]){column(label:'Id', name:'persona.id', sortable:true, selectable:true, transformation:{}),column(label:'Età Persona', name:'età', sortable:true, selectable:true, transformation:{}),column(label:'Nome Azienda', name:'azienda.nome', sortable:true, selectable:true, transformation:{})}show(populate:['path:azienda,model:azienda}']){row(label:'Nome Persona', name:'nome'),row(label:'Codice Fiscale', name:'CF'),row(label:'Età Persona', nome:'età'),row(label:'Nome Azienda', name:'azienda.nome'),row(label:'P.IVA Azienda', name:'azienda.PIVA')}}"; // dsli che verrà passata per parametro
    //let x="cell(label: 'vacca', type : 'string', value:21 )";
//let x="document(collection:'Account', name:'franco',label:'sora', id:'jejio', weight:0){show(populate:['{path:ciccio,model:ringhio}','{path:gianno,model:morandi}']){row(label:'xx', name:'vv'),row(label:'ff', name:'jj'),row(label:'kk', name:'hh')}}";
    let preCompileFile = macro + x;

    let compiledDSLI = compile(preCompileFile); //compilazione del preCompiledFile

    /*console.log("FILE PRECOMPILATO: ");
    console.log(preCompileFile);
    console.log("DSLI COMPILATA: ");
    console.log(compiledDSLI);
/*    //console.log(parse);
    //this.qualcosa crea una variabile resistente alle chiamate di render
    //this.parser = new Parser;
    //this.parser.compileAndRun();*/

    var obj = undefined;
    function insert(object){
     obj=object;
    }
      vm.runInNewContext(compiledDSLI.code, {insert:insert, require:require, cellModel:cellModel, dashboardModel:dashboardModel, collectionModel:collectionModel, documentModel:documentModel});
    this.object=obj;
    //var query = "db.collection('Account').find({dutyId:{$gt: 2}},{password: 1}).sort({subscribedAt: 1})";
    //console.log("QUERY: ");
    //console.log(fd.returnData(), fd.getType());*/

  }

  render() {
    const { store } = this.context
    var dsli = store.getState().currentDSLI
    //var query = "db.collection('Account').find({dutyId:{$gt: 2}},{password: 1}).sort({subscribedAt: 1})";
    /*if(this.flag){
      this.flag = false;
      store.dispatch(actions.execDSLI(dsli.id, query))
    }*/
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


      /*var populate = [{path:"Scarpe", model:"Scarpe"}]; //esempio di prova
      var principalQuery = [{"_id": "00000","nome": "angelo poretti", "Scarpe" : "0000000"},{"_id": "00001","nome": "Alberto angela", "Scarpe" : "0000001"}];
      var secondQuery = [{"_id":"0000000","nome": "Air Nike"},{"_id":"0000001","nome":"Superga"}];
      var collection = populate[0].model;
      var attribute = populate[0].path;
      //creo la query e la lancio con solo collection
      var id
      for(var i=0; i<principalQuery.length; i++){
         id = principalQuery[i][attribute];
         for(var j=0; j<secondQuery.length; j++){
               console.log(id);
           if(secondQuery[j]._id == id){

             principalQuery[i][attribute] = secondQuery[j];
           }
         }
       }
      console.log("prova");
      console.log(collection, attribute, principalQuery, principalQuery[0].Scarpe.nome);*/
if(DSLType == "collection"){
      var query = this.object.buildIndexQuery();
      console.log(query);
      var populate = this.object.getPopulateIndex();
      var principalQuery;
      if(this.flag){
            this.flag = false;
            store.dispatch(actions.execDSLI(dsli.id, query));
      }
      principalQuery=dsli.result;
      console.log("1",principalQuery,populate.length,this.flag1);
      var flag2 = true;
      /*if(populate && this.flag1){
          for(var i=0; i<populate.length; i++){
            flag2=true;
            var collection = populate[i].model;
            var attribute = populate[i].path;
            var queryPopulate = "db.collection('"+ collection +"').find()";
            console.log("2",collection,attribute,queryPopulate);
            store.dispatch(actions.execDSLI(dsli.id, "db.collection('Account').find()"));
            var secondQuery = dsli.result;
            console.log("3",secondQuery,principalQuery.length,secondQuery.length);
            /*for(var i=0; i<principalQuery.length; i++){
                var id = principalQuery[i][attribute];
                for(var j=0; j<secondQuery.length; j++){
                  if(secondQuery[j]._id == id){
                    principalQuery[i][attribute] = secondQuery[j];
                  }
                }
              }
            }
            this.flag1=false;
          }*/
        var JSON = this.object.JSONbuild(principalQuery);
        console.log("BBBBBBBBBBBBBBBBBBBB",principalQuery);
        console.log("EEEEEEEEEEEEE",JSON);
      //MAnca lo showModel
    }/*
    if(DSLType == "document"){
      var query = this.object.buildQuery();
      //store.dispatch(actions.execDSLI(dsli.id, query));
      //var principalQuery=dsli.result;
      var populate=this.object.getPopulate();

      /*var populate = [{path:"Scarpe", model:"Scarpe"}]; //esempio di prova
      var principalQuery = { "nome": "angelo poretti", "Scarpe" : "0000000"};
      var secondQuery = {"id":"0000000","nome": "Air Nike"};
      var collection = populate[0].model;
      var attribute = populate[0].path;
      var id = principalQuery[attribute];
      //creo la query e la lancio
      principalQuery[attribute]=secondQuery;
      console.log("prova");
      console.log(collection, attribute, id, principalQuery, principalQuery.Scarpe.nome);*/
/*
      if(populate){
        for(var i=0; i<populate.length; i++){
          var collection = populate[i].model;
          var attribute = populate[i].path;
          //var id = principalQuery[attribute];
          //var queryPopulate = "db.collection("+ collection +").find({_id:" + id + "})";
          //store.dispatch(actions.execDSLI(dsli.id, queryPopulate));
          //principalQuery[attribute]=dsli.result;
        }
      }
      var rows = this.object.getRows(); //Array ogni cella rappresenta una riga

    }
    if(DSLType == "dashboard"){
      var label = this.object.getLabel();
      //var rows = this.object.matrix();//matrice di elementi il primo [] rappresenta una riga il secondo [] rappresenta l'elemento
     }
    if(this.flag){
      this.flag = false;
    //  var query1 = "db.collection('Account')";
    //  store.dispatch(actions.execDSLI(dsli.id, query1));
      //console.log(dsli.result);
        //store.dispatch(this.object.execQuery(dsli.id, query))
    }*/
 if(dsli.result == undefined){
      return (
        <div>
          loading...
        </div>
      )
    }
    else{
      //console.log(dsli.result);
      console.log("CELLA",JSON)
      return (
    	  <div>
          //{dsli.result.toString()}
          console.log(JSON)
        </div>
    	)
    }
  }
}

PageBuilder.contextTypes = {
  store : React.PropTypes.object
}

export default PageBuilder
