import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import {compileDSLI} from '../utils/DSLICompiler';

class PageBuilder extends Component {
  constructor(props) {
    super(props)
    this.flag = true;
    this.flag2 = true;
    this.show = false ;
    this.storageResult = [];
    this.secondQuery = [];
    this.count =0;
    this.JSON;

    this.object = compileDSLI(this.props.dsli.code);
   }

  render() {
   const { store } = this.context;
    var dsli = this.props.dsli;
    var DSLType = this.object.DSLType();
    if(this.object)
      return this.object.render(store);
    else
      return <div>Compilando il codice ...</div>;
   }
 }


PageBuilder.contextTypes = {
  store : React.PropTypes.object
}

export default PageBuilder
