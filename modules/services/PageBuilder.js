import {parse, expand, compile} from 'sweet.js'
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
var macro = require('includes!../../macro.sjs');
import cellModel from '../model/CellModel';
import collectionModel from '../model/CollectionModel';
import dashboardModel from '../model/DashboardModel';
import documentModel from '../model/DocumentModel';
import request from 'superagent'
import vm from 'vm';
//import clone from 'clone';
class PageBuilder extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.flag = true;
    this.flag1 = false ;
    this.show = false ;
    this.storageResult = [];
    this.JSON;
    //let x="cell(label: 'prova', type : 'string', value : { collection : 'Account' , query : '{dutyId:{$gt: 2}},{password: 1}', sortby:'{subscribedAt: 1}' ,order:'asc' })";
    //let x="dashboard(  name: 'dragonball'){row{cell:'goku',collection:'saiyan',document:'mondi di Daragonball'},row{cell:'saiyan viventi'}}";
    let x="collection(name:'DSL',label:'persone di età >=30/anzienda';id:'persona/azienda_collection';weight:0;){index(populate:[{path:'accountId',model:'Account'}]){column(label:'Id', name:'persona.id', sortable:true, selectable:true, transformation:{}),column(label:'Età Persona', name:'età', sortable:true, selectable:true, transformation:{}),column(label:'Nome Azienda', name:'azienda.nome', sortable:true, selectable:true, transformation:{})}show(populate:['path:azienda,model:azienda']){row(label:'Nome Persona', name:'nome'),row(label:'Codice Fiscale', name:'CF'),row(label:'Età Persona', nome:'età'),row(label:'Nome Azienda', name:'azienda.nome'),row(label:'P.IVA Azienda', name:'azienda.PIVA')}}"; // dsli che verrà passata per parametro
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

  executeQuery(dsli, data, cb) {
    const { store } = this.context;
    request
      .post('https://mass-demo.herokuapp.com/api/dsl/'+dsli.id+'/execute?access_token='+store.getState().loggedUser.token)
      .send({query: data})
      .then(
        function(result){
          let res = JSON.parse(result.text)
          cb(null, res);
        },
        function(error){
          cb(error, null);
        }
      )
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

      if(this.flag){                                                              //EXECUTES ONCE
        this.flag = false;

        var query = this.object.buildIndexQuery();
        var populate = this.object.getPopulateIndex();

        this.executeQuery(dsli,"db.collection('DSL').find()", (err,res) =>{       //LAUNCH OF A QUERY
          if(err)                                                                 //CALLBACK FUNCTION WHERE QUERY ENDS
            return;
          this.storageResult = Object.assign({}, res);
          console.log("DSLI:");
          console.log(res);
          store.dispatch(actions.refresh());                                      //CALL RENDER TO DISPLAY DATA
        });

        var collection = populate[0].model;
        var attribute = populate[0].path;
        var populateQuery = "db.collection('"+ collection +"').find()";

        this.executeQuery(dsli, populateQuery, (err,res) =>{                      //SAME THING HERE
          if(err)
            return;
          this.secondQuery = Object.assign({}, dsli.result);
          console.log("ACCOUNT:");
          console.log(res);
          store.dispatch(actions.refresh());
        });
      }

      if(this.storageResult && this.secondQuery){                                 //SET SHOW TO TRUE WHEN DATA IS READY
        this.show = true;
        console.log("principalQuery :", this.storageResult);
        console.log("secondQuery: ",this.secondQuery);
      }
    }

    if(!this.show)
      return <div>loading...</div>
    else
      return <div>{this.secondQuery.toString()}/{this.storageResult.toString()}</div>

   }
 }


PageBuilder.contextTypes = {
  store : React.PropTypes.object
}

export default PageBuilder
