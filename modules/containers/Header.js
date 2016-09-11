/*
* Name : Header.js
* Location : ./modules/containers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-07   Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
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
      if(store.getState().loggedUser.accessLevel == 9) {
        list =
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <MLink to="/homeDeveloper" className="navbar-brand">
                <img src="../Immagini/MAAS_white.png" alt="logo MaaS" className="MaaSlogo"/>
              </MLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to='/homeDeveloper'>
                <NavItem eventKey={1}>Home</NavItem>
              </LinkContainer>
              <NavDropdown eventKey={2} title={store.getState().loggedUser.account} id="basic-nav-dropdown">
                <LinkContainer to='/profile'>
                  <MenuItem eventKey={2.1}>Profile</MenuItem>
                </LinkContainer>
                <LinkContainer to='/' onClick = {() => { store.dispatch(actions.logout()) }}>
                  <MenuItem eventKey={2.2}>Logout</MenuItem>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      }
      else if(store.getState().loggedUser.accessLevel >= 2) {
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
                <LinkContainer to='/managepvtdsli' onClick = {() => { store.dispatch(actions.getDSLIList()) }}>
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
    }
    else{
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
            <LinkContainer to='/signUp'>
              <NavItem eventKey={1}>Sign up</NavItem>
            </LinkContainer>
            <LinkContainer to='/login'>
              <NavItem eventKey={1}>Login</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    }

    return (
        <div id="wrapper">
          <div id="header">
            <div className="navbar navbar-inverse navbar-fixed-top">
              {list}
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
            <MLink to="/support">Contact Support</MLink >
          </div>
        </div>
    )
  }
}

Header.contextTypes = {
  store : React.PropTypes.object
}

export default Header
