/*
* Name : Provider.js
* Location : ./modules/containers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-17   Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'

class Provider extends Component {
  getChildContext(){
    return {
      store : this.props.store
    }
  }

  render() {
      return this.props.children
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}

export default Provider
