//import Parser from './Parser'
import {parse, expand, compile} from 'sweet.js'
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
var macro = require('includes!../../macro.sjs');
import cell from '../model/CellModel';
import vm from 'vm';

class PageBuilder extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.flag = true;

    let x="cell(type : 'string',value : { collection : 'scarpe' , query : '{size:{$gt:38}}' })";
    let preCompileFile = macro + x;

    let compiledDSLI = compile(preCompileFile); //compilazione del preCompiledFile
/*
    console.log("FILE PRECOMPILATO: ");
    console.log(preCompileFile);
    console.log("DSLI COMPILATA: ");
    console.log(compiledDSLI);
    //console.log(parse);
    //this.qualcosa crea una variabile resistente alle chiamate di render
    //this.parser = new Parser;
    //this.parser.compileAndRun();

    var fd;
    function insert(pro){
     fd=pro;
    }
    //vm.runInNewContext(compiledDSLI.code, {insert:insert, require:require, cell:cell});
    /*var query = "db.collection('Account').find({dutyId:{$gt: 2}},{password: 1}).sort({subscribedAt: 1})";
    console.log("QUERY: ");
    console.log(fd.returnData(), fd.getType());*/

  }

  render() {
    const { store } = this.context
    var dsli = store.getState().currentDSLI
    var query = "db.collection('Account').find({dutyId:{$gt: 2}},{password: 1}).sort({subscribedAt: 1})";
    if(this.flag){
      this.flag = false;
      store.dispatch(actions.execDSLI(dsli.id, query))
    }
    if(dsli.result == undefined){
      return (
        <div>
          loading...
        </div>
      )
    }
    else{
      console.log(dsli.result);
      return (
    	  <div>
          {dsli.result.toString()}
        </div>
    	)
    }
  }
}

PageBuilder.contextTypes = {
  store : React.PropTypes.object
}

export default PageBuilder
