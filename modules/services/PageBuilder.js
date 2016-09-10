/*
* Name : PageBuilder.js
* Location : ./modules/services/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-13     Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
* 1.0.0           2016-09-08     Roberto D'amico
* -------------------------------------------------
* Inserimento del metodo Render
* =================================================
*/

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
