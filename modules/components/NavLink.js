// modules/NavLink.js
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return <Link {...this.props} rel="stylesheet" type="text/css" activeClassName="active"/>
  }
})
