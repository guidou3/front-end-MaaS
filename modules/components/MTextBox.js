/*
* Name : MError.js
* Location : ./modules/components/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-11     Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'

class MTextBox extends Component {

  render() {
    return (
      <input {...this.props}  onChange={this.props.onWrite} defaultValue={this.props.defaultLabel}/>
    )
  }
}

MTextBox.contextTypes = {
  store : React.PropTypes.object
}

export default MTextBox
