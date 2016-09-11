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
import {compileDSLI} from '../utils/DSLICompiler'

class PageBuilder extends Component {
  constructor(props) {
    super(props)

    this.object = compileDSLI(this.props.dsli.code);
    console.log(this.props.location);
    if(this.props.location.query){
      this.object.showID = this.props.location.query.SHOW;
      this.object.guest = this.props.location.query.GUEST;
    }
  }

  render() {
    const { store } = this.context
    if(this.object)
      return this.object.render(store);
    else
      return <div className="loading">Compilando il codice ...</div>;
   }
 }


PageBuilder.contextTypes = {
  store : React.PropTypes.object
}

export default PageBuilder
