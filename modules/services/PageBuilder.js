//import Parser from './Parser'
import {parse, expand, compile} from 'sweet.js'
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'

class PageBuilder extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    //console.log(parse);
    //this.qualcosa crea una variabile resistente alle chiamate di render
    //this.parser = new Parser;
    //this.parser.compileAndRun();
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
