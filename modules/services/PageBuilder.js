//import Parser from './Parser'
import {parse, expand, compile} from 'sweet.js'
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
var macro = require('includes!../../macro.sjs');
import cell from '../../model/cell';
var vm = require('vm');

class PageBuilder extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    console.log(macro); //per capire se l'ha letto dopo va tolto
    //let x="collection(name:'persona',label:'persone di età >=30/anzienda';id:'persona/azienda_collection';weight:0;){index(perpage:50, populate:['{path:azienda,model:azienda}'], sortby:'nome', order:'asc', query:'{età:{$gte:30}}'){column(label:'Nome Persona', name:'nome', sortable:true, selectable:true, transformation:{}),column(label:'Età Persona', name:'età', sortable:true, selectable:true, transformation:{}),column(label:'Nome Azienda', name:'azienda.nome', sortable:true, selectable:true, transformation:{})}show(populate:['path:azienda,model:azienda}']){row(label:'Nome Persona', name:'nome'),row(label:'Codice Fiscale', name:'CF'),row(label:'Età Persona', nome:'età'),row(label:'Nome Azienda', name:'azienda.nome'),row(label:'P.IVA Azienda', name:'azienda.PIVA')}}"; // dsli che verrà passata per parametro
    let x="cell(type : 'string',value : { collection : 'scarpe',query : '{size:{$gt:38}}', sortby : size,order : 'asc' })";
    let preCompileFile = macro; // + x; //unione della macro e delle dsli
    let compiledDSLI = compile(preCompileFile); //compilazione del preCompiledFile
    console.log(preCompileFile);
    console.log(compiledDSLI);
    //console.log(parse);
    //this.qualcosa crea una variabile resistente alle chiamate di render
    //this.parser = new Parser;
    //this.parser.compileAndRun();
    var fd;
    function insert(pro){
     fd=pro;
    }
    vm.runInNewContext(compiledDSLI.code, {insert:insert, require:require, cell:cell});
//L'oggetto è fd e se vuoi la query chiama il metodo returnData()
    console.log(fd.returnData(), fd.getType());
  }

  render() {
    const { store } = this.context
    //var x = compile(store.getState().currentDSLI.code)
    //console.log(x);
    //const { store } = this.context
    //let dsli = store.getState().currentDSLI
    //ogni action risolta si passa da qui
    return (
  	  <div>
        {parse}
      </div>
  	)
  }
}

PageBuilder.contextTypes = {
  store : React.PropTypes.object
}

export default PageBuilder
