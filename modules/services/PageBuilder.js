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
    this.secondQuery = [];
    this.count =0;
    this.JSON;
    //let x="cell(label: 'prova', type : 'string', value : { collection : 'Account' , query : '{dutyId:1},{companyId: 1}'})";
    //le0t x="dashboard(label: 'dragonball'){row{cell:{label:'goku',dsl:\"cell(label:'xx', type:'String', value:10)\"},collection:{label:'goku',dsl:\"cell(label:'xx',value:10)\"}},row{collection:{label:'goku',dsl:\"cell(label:'xx',value:10)\"}}}";
    //

    //let x="collection(name:'DSL',label:'persone di età >=30/anzienda';id:'persona/azienda_collection';weight:0;){index(populate:[{path:'accountId', model:'Account'}]){column(label:'Id', name:'persona.id', sortable:true, selectable:true, transformation:{}),column(label:'Età Persona', name:'età', sortable:true, selectable:true, transformation:{}),column(label:'Nome Azienda', name:'azienda.nome', sortable:true, selectable:true, transformation:{})}show(populate:['path:azienda,model:azienda']){row(label:'Nome Persona', name:'nome'),row(label:'Codice Fiscale', name:'CF'),row(label:'Età Persona', nome:'età'),row(label:'Nome Azienda', name:'azienda.nome'),row(label:'P.IVA Azienda', name:'azienda.PIVA')}}"; // dsli che verrà passata per parametro
    //let x="cell(label: 'vacca', type : 'string', value:{collection:'Account', count:true} )";
    //let x="document(collection:'Account', name:'franco',label:'sora', id:'jejio', weight:0){show(populate:['{path:ciccio,model:ringhio}','{path:gianno,model:morandi}']){row(label:'xx', name:'vv'),row(label:'ff', name:'jj'),row(label:'kk', name:'hh')}}";
    //let x = "cell(label: 'prova', type : 'string', value : { collection : 'Account' , query : '{dutyId:{$gt: 2}},{password: 1}', sortby:'{subscribedAt: 1}' ,order:'asc', count: 'true' })";
     //let x="document(collection:'DSL', name:'franco',label:'sora', id:'jejio', weight:0){show(populate:[{path:'accountId',model:'Account'}]){row(label:'xx', name:'vv'),row(label:'ff', name:'jj'),row(label:'kk', name:'hh')}}";
    //let x="cell(label:'numero',type:'link',value:{collection:'Account'})"
    //////////////
    //let x="cell(label: 'prova', type : 'string', value : { collection : 'Account' , query : '{dutyId:1},{companyId: 1}'})";
   let x="dashboard(label: 'dragonball'){row{cell:{label:'goku',dsl:\"cell(label:'xx', type:'String', value:10)\"},collection:{label:'goku',dsl:\"cell(label:'xx',value:10)\"}},row{collection:{label:'goku',dsl:\"cell(label:'xx',value:10)\"}}}";
   //let x="collection(name:'DSL',label:'persone di età >=30/anzienda';id:'persona/azienda_collection';weight:0;){index(){}show(populate:['path:azienda,model:azienda']){}}"; // dsli che verrà passata per parametro
   //let x="cell(label: 'vacca', type : 'string', value:{collection:'Account', count:true} )";
   //let x="document(collection:'Account', name:'franco',label:'sora', id:'jejio', weight:0){show(populate:['{path:ciccio,model:ringhio}','{path:gianno,model:morandi}']){}}";
   //let x = "cell(label: 'prova', type : 'string', value : { collection : 'Account' , query : '{password:asd}', sortby:'{subscribedAt: 1}' ,order:'asc' ,count :1})";
   //let x ="document(collection:'DSL', name:'franco',label:'sora', query : '{companyId : \"matrioska\"}'){show(populate:[{path:'accountId',model:'Account'}]){row(label:'xx', name:'vv'),row(label:'ff', name:'jj'),row(label:'kk', name:'hh')}}";
     let preCompileFile = macro + x;

    let compiledDSLI = compile(preCompileFile); //compilazione del preCompiledFile


    var obj = undefined;
    function insert(object){
     obj=object;
    }
      vm.runInNewContext(compiledDSLI.code, {insert:insert, require:require, cellModel:cellModel, dashboardModel:dashboardModel, collectionModel:collectionModel, documentModel:documentModel});
    this.object=obj;
    //console.log("BB",this.object,this.object.JSONbuild());
    //console.log(this.object.matrix());
   }

  executeQuery(dsli, data, cb) {
    const { store } = this.context;
    request
      .post('https://mass-demo.herokuapp.com/api/dsl/'+dsli.id+'/execute?access_token='+store.getState().loggedUser.token)
      .send({query: data.toString()})
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
        console.log(query)
          if(this.flag){
            this.flag = false;
            store.dispatch(actions.execDSLI(dsli.id, query));

          }
          this.JSON=this.object.JSONbuild(dsli.result);
          this.show =true;
      }
      else{
       this.JSON =this.object.JSONbuild(this.object.buildQuery());
       this.show =true;
      }
    }

    if(DSLType == "collection"){
      var populate = this.object.getPopulateIndex();
      if(this.flag){                                                              //EXECUTES ONCE
        this.flag = false;
        var query = this.object.buildIndexQuery();
        this.executeQuery(dsli,query, (err,res) =>{       //LAUNCH OF A QUERY
          if(err)                                                                 //CALLBACK FUNCTION WHERE QUERY ENDS
            return;
          this.storageResult = Object.assign({}, res);
          console.log("DSLI:");
          console.log(res);
          store.dispatch(actions.refresh());                                      //CALL RENDER TO DISPLAY DATA
        });
        if(populate){
          for(var k =0; k< populate.length; k++){
            this.count ++;
            var collection = populate[k].model;

            var populateQuery = "db.collection('"+ collection +"').find()";
            this.executeQuery(dsli, populateQuery, (err,res) =>{                      //SAME THING HERE
              if(err)
                return;
                this.secondQuery.push(Object.assign({}, res));
                console.log("ACCOUNT:");
                console.log(res);
                store.dispatch(actions.refresh());
              });
            }
        }
      }
      console.log(this.count);
      if(this.count != 0){
      if(this.storageResult && this.secondQuery && this.count == Object.keys(this.secondQuery).length){                                 //SET SHOW TO TRUE WHEN DATA IS READY
        this.show = true;
        console.log("principalQuery :", this.storageResult, this.storageResult.length);
        console.log("secondQuery: ",this.secondQuery);
        for(var k=0; k<Object.keys(this.secondQuery).length; k++){
          var attribute = populate[k].path;
           for(var i=0; i<Object.keys(this.storageResult).length; i++){
            var id = this.storageResult[i][attribute];
            for(var j=0; j<Object.keys(this.secondQuery[k]).length; j++){
              if(this.secondQuery[k][j]._id == id){
                this.storageResult[i][attribute] = this.secondQuery[k][j];
              }
            }
        }
      }
      console.log("ddklnkd", this.storageResult);
      this.JSON=this.object.JSONbuild(this.storageResult);
    }
  }
  else{
    if(this.storageResult){
      this.show = true;
      console.log("principalQuery :", this.storageResult, "prova");
      this.JSON=this.object.JSONbuild(this.storageResult);
    }
  }

    }
    if(DSLType == "document"){
  var populate =this.object.getPopulate();
  if(this.flag){
    this.flag = false;
    var query = this.object.buildQuery();
    this.executeQuery(dsli, query, (err,res)=>{
      if(err)
        return;
      this.storageResult = Object.assign({}, res);
      console.log("DSLI:");
      console.log(res);
      store.dispatch(actions.refresh());
    });
    if(populate){
      for(var i=0; i<populate.length; i++)
      {
        this.count ++;
        var collDocument = populate[i].model;
        var populateQuery = "db.collection('"+collDocument+"').find()";
        console.log("hello my friend");
        this.executeQuery(dsli, populateQuery, (err,res)=>{
          if(err)
            return;
            this.secondQuery.push(Object.assign({}, res));
            console.log("ACCOUNT:");
            console.log(res);
            store.dispatch(actions.refresh());
        });
      }
    }
  }
  console.log(this.count);
  if(this.count != 0){
  if(this.storageResult && this.secondQuery && this.count == Object.keys(this.secondQuery).length){                                 //SET SHOW TO TRUE WHEN DATA IS READY
    this.show = true;
    console.log("principalQuery :", this.storageResult, this.storageResult.length);
    console.log("secondQuery: ",this.secondQuery);
    for(var k=0; k<Object.keys(this.secondQuery).length; k++){
      var attribute = populate[k].path;
       for(var i=0; i<Object.keys(this.storageResult).length; i++){
        var id = this.storageResult[i][attribute];
        for(var j=0; j<Object.keys(this.secondQuery[k]).length; j++){
          if(this.secondQuery[k][j]._id == id){
            this.storageResult[i][attribute] = this.secondQuery[k][j];
          }
        }
    }
  }
  console.log("ddklnkd", this.storageResult);
  this.JSON=this.object.JSONbuild(this.storageResult);
}
}
else{
if(this.storageResult){
  this.show = true;
  console.log("principalQuery :", this.storageResult, "prova");
  this.JSON=this.object.JSONbuild(this.storageResult);
}
}
}
if(DSLType=="dashboard"){
  this.show = true;
}

    if(!this.show)
      {return <div>loading...</div>}
    else
      {console.log("AAAAAAAAAAAAAAAA",this.JSON);
      return <div>{this.secondQuery.toString()}/{this.storageResult.toString()}</div>}

   }
 }


PageBuilder.contextTypes = {
  store : React.PropTypes.object
}

export default PageBuilder
