import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MLink, MError} = Components
import MainPage from './MainPage'

class Header extends Component {
  render() {
    const {store} = this.context
    let list
    if(store.getState().loggedUser != 0){
      list =
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <MLink to="/home" className="navbar-brand">
              <img src="../Immagini/MAAS_white.png" alt="logo MaaS" className="MaaSlogo"/>
            </MLink>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
                <li><MLink to="/home">Home</MLink></li>
                <li><MLink to="/profile">Profile</MLink ></li>
                <li><MLink
                  onClick = {() => {
                    store.dispatch(actions.logout())
                  }}
                to="/">LogOut</MLink ></li>
                <li><MLink
                  onClick = {() => {
                    store.dispatch(actions.getUserList(store))
                  }} to="/manageuser">Users</MLink ></li>
                <li><MLink
                  onClick = {() => {
                    store.dispatch(actions.getDSLIList())
                  }} to="/managedsli">DSLI</MLink ></li>
                <li><MLink
                  onClick = {() => {
                    store.dispatch(actions.getDatabase())
                  }} to="/managedata">Database</MLink ></li>
            </ul>
          </div>
        </div>
    }
    else{
      list =
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <MLink to="/" className="navbar-brand">
              <img src="../Immagini/MAAS_white.png" alt="logo MaaS" className="MaaSlogo"/>
            </MLink>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
            <li><MLink to="/signIn">Sign in</MLink ></li>
            <li><MLink to="/login">Login</MLink ></li>
            </ul>
          </div>
        </div>
    }

    return (
        <div id="wrapper">
          <div id="header">

            <p>MaaS: MongoDB as an admin Service</p>

            <div className="navbar navbar-inverse navbar-fixed-top">
              {list}
            </div>

            <div id="errors">
              <MError/>
            </div>

          </div>

          <div id="bodyImage">
            <div id="body">
              <div id="content">
                {this.props.children || <MainPage/>}
              </div>
            </div>
          </div>

          <div id="footer">
            <MLink to="/support">Contatta il supporto!</MLink >
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
