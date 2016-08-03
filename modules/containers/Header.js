import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import ErrDisplay from '../components/ErrDisplay'
import * as actions from '../actions/RootAction'
import NavLink from '../components/NavLink'
import MainPage from './MainPage'

class Header extends Component {
  render() {
    const {store} = this.context
    let list
    if(store.getState().auth == 1){
      list =
        <ul>
				    <li><IndexLink to="/home" activeClassName="active">Home</IndexLink></li>
            <li><NavLink to="/list">List</NavLink ></li>
            <li><NavLink
              onClick = {() => {
                store.dispatch(actions.getProfile(store))
              }}
            to="/profile">Profile</NavLink ></li>
            <li><NavLink
              onClick = {() => {
                store.dispatch(actions.logout())
              }}
            to="/">LogOut</NavLink ></li>
            <li><NavLink
              onClick = {() => {
                store.dispatch(actions.getProfile(store))
              }}
            to="/manageuser">Users</NavLink ></li>
            <li><NavLink to="/managedsli">DSLI</NavLink ></li>
			  </ul>
    }
    else{
      list =
        <ul>
            <li><NavLink to="/signIn">Sign in</NavLink ></li>
            <li><NavLink to="/login">Login</NavLink ></li>
			  </ul>
    }

    return (
        <div id="wrapper">
          <div id="header">
            <img src="../Immagini/MAAS_white.png" alt="logo MaaS" id="MaaSlogo"
              onClick = {() => {
                store.dispatch(actions.redirect('/'))
            }}/>
            <p>MaaS: MongoDB as an admin Service</p>

            <div id="bar">
              {list}
            </div>

            <div id="errors">
              <ErrDisplay/>
            </div>

          </div>

          <div id="bodyImage">
            <div id="body">
              <div id="content">
                {this.props.children || <Home/>}
              </div>
            </div>
          </div>

          <div id="footer">
            <NavLink to="/support">Contatta il supporto!</NavLink >
            <a href="" id="superadminaccess">administrator login</a>
          </div>
        </div>
    )
  }
}

Header.contextTypes = {
  store : React.PropTypes.object
}

export default Header
