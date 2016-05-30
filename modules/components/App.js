import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import NavLink from './NavLink'
import Home from './Home'

class App extends Component {
  render() {
    return (
      <div>
		  <h1> MaaS: MongoDB as an admin Service </h1>
		  <div id="mainmenu">
			<ul role="nav" id="menu">
				<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
				<li><NavLink to="/signIn">Sign in</NavLink ></li>
				<li><NavLink to="/login">Login</NavLink ></li>
			</ul>
		   </div>
		   <div id="content">
			{this.props.children || <Home/>}
		  </div>
      </div>
    )
  }
}

export default App
