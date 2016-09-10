/*
* Name : MError.js
* Location : ./modules/components/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-10     Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'

class MTextArea extends Component {

  render() {
    return (
      <textarea {...this.props}  onChange={this.props.onWrite} defaultValue={this.props.dfvalue}/>
    )
  }
}

MTextArea.contextTypes = {
  store : React.PropTypes.object
}

export default MTextArea
