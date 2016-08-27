import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MLink, MError} = Components
import MainPage from './MainPage'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import {NavItemLink, MenuItemLink, LinkContainer} from 'react-router-bootstrap';

class Header extends Component {
  render() {
    const {store} = this.context
    let list
    if(store.getState().loggedUser != 0){
      if(store.getState().loggedUser.accessLevel >= 2) {
        list =
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <MLink to="/home" className="navbar-brand">
                <img src="../Immagini/MAAS_white.png" alt="logo MaaS" className="MaaSlogo"/>
              </MLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to='/home'>
                <NavItem eventKey={1}>Home</NavItem>
              </LinkContainer>
              <NavDropdown eventKey={2} title="DSLI" id="basic-nav-dropdown">
                <LinkContainer to='/managedsli' onClick = {() => { store.dispatch(actions.getDSLIList()) }}>
                  <MenuItem eventKey={2.1}>Public DSLI</MenuItem>
                </LinkContainer>
                <LinkContainer to='/managedsli' onClick = {() => { store.dispatch(actions.getDSLIList()) }}>
                  <MenuItem eventKey={2.2}>Private DSLI</MenuItem>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to='/manageuser' onClick = {() => { store.dispatch(actions.getUserList()) }}>
                <NavItem eventKey={3}>Users</NavItem>
              </LinkContainer>
              <LinkContainer to='/managedata' onClick = {() => { store.dispatch(actions.getDatabase()) }}>
                <NavItem eventKey={4}>Database</NavItem>
              </LinkContainer>
              <NavDropdown eventKey={5} title={store.getState().loggedUser.account} id="basic-nav-dropdown">
                <LinkContainer to='/profile'>
                  <MenuItem eventKey={5.1}>Profile</MenuItem>
                </LinkContainer>
                <LinkContainer to='/' onClick = {() => { store.dispatch(actions.logout()) }}>
                  <MenuItem eventKey={5.2}>Logout</MenuItem>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      }
      else {
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
                  <li className="dropdown">
          				    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          						  Profilo
          							<span className="caret"/>
          						</a>
          					<ul className="dropdown-menu" id="dropdown">
          					<li>
          						 <a href="/profile">Profile</a>
          					</li>
          					<li>
          						<a href="/logout">
          							LogOut
          						</a >
          					</li>
          				  </ul>
          				</li>
                  <li><MLink to="/profile">Profile</MLink ></li>
                  <li><MLink
                    onClick = {() => {
                      store.dispatch(actions.logout())
                    }}
                  to="/">LogOut</MLink ></li>
              </ul>
            </div>
          </div>
      }
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
