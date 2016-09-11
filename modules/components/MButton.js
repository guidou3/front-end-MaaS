/*
* Name : MBotton.js
* Location : ./modules/components/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-07-29     Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'

class MButton extends Component {

  render() {
    return (
      <button {...this.props}
        type = "button"
        onClick = {this.props.onClick}>
        {this.props.label}
      </button>
    )
  }
}

MButton.contextTypes = {
  store : React.PropTypes.object
}

export default MButton
