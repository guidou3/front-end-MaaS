/*
* Name : MError.js
* Location : ./modules/components/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-09     Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class MLink extends Component {

  render() {
    return (
      <Link {...this.props} rel="stylesheet" type="text/css" activeClassName="active"/>
    )
  }
}

MLink.contextTypes = {
  store : React.PropTypes.object
}

export default MLink
