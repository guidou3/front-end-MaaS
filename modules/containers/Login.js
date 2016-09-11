/*
* Name : Login.js
* Location : ./modules/containers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-12  Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import {push} from 'react-router-redux'
import * as actions from '../actions/RootAction'
import Modal from 'react-modal'
import Components from '../components'
const {MTextBox, MButton, MLink, MError} = Components


const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    //backgroundColor   : 'rgba(0, 0, 0, 0.5)'
  },
  content : {
    position          : 'absolute',
    top               : '50%',
    left              : '50%',
    right             : 'none',
    bottom            : 'none',
    marginRight       : 'none',
    //background        : 'rgba(0, 0, 0, 0.5)',
    outline           : 'none',
    borderRadius      : 'none',
    transform         : 'translate(-50%, -50%)',
    border            : 'none',
    padding           : 'none'
  }
};


class LogIn extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.recoveryWarn =""
    this.dialog = false
  }
  goHome() {
    const { store } = this.context
    if(store.getState().loggedUser != 0)
    {
      if(store.getState().loggedUser.accessLevel == 9) {
        store.dispatch(push('/homeDeveloper'))
      }
      else {
        store.dispatch(actions.getDSLIList())
        .then(() => (store.dispatch(push('/home'))))
      }
    }
  }
  render() {
    const { store } = this.context
    if(store.getState().status.result == "error") {
      if(this.dialog == true) {
        this.recoveryWarn = <MError/>
      }
      else {
        this.warn = <MError/>
      }
    }
    else {
      this.warn = ""
      this.recoveryWarn = ""
    }
    return (
      <div>
      <section id="login">
          <div className="container">
          	<div className="row">
          	    <div className="col-xs-12">
              	    <div className="form-wrap">
                      <h1>Log in with your email account</h1>
                          <form role="form" action="javascript:;" method="post" id="login-form" autoComplete="on">
                              <div className="form-group">
                                  <label htmlFor="email" className="sr-only">Email</label>
                                  <MTextBox type="email" name="email" id="email" className="form-control" placeholder="somebody@example.com" onWrite={(event) => {this.mail = event.target.value}}/>
                              </div>
                              <div className="form-group">
                                  <label htmlFor="key" className="sr-only">Password</label>
                                  <MTextBox type="password" name="key" id="key" className="form-control" placeholder="Password" onWrite={(event) => {this.pwd = event.target.value}}/>
                              </div>
                              {this.warn}
                              <MButton type="submit" id="btn-login" className="btn btn-custom btn-lg btn-block" label="Log in" onClick = {() => {
                                store.dispatch(actions.login({mail:this.mail, pwd:this.pwd}))
                                .then(() => (
                                  this.goHome()
                                ))
                              }}/>
                          </form>
                          <a href="#" className="forget" data-toggle="modal" data-target=".forget-modal"onClick = {() => {
                            this.dialog = true
                            store.dispatch(actions.refresh())
                          }}>Forgot your password?</a>
                          <hr></hr>
              	    </div>
          		</div>
          	</div>
          </div>
      </section>
      <Modal isOpen= {this.dialog} style={customStyles} transparent={true}>
        	<div className="modal-dialog modal-sm">
        		<div className="modal-content">
        			<div className="modal-header">
        				<button type="button" className="close" data-dismiss="modal" onClick = {() => {
                  this.dialog = false
                  store.dispatch(actions.refresh())
                }}>
        					<span aria-hidden="true">×</span>
        					<span className="sr-only">Close</span>
        				</button>
        				<h4 className="modal-title">Recover password</h4>
        			</div>
        			<div className="modal-body">
        				<p>Type your email account</p>
                <MTextBox type="email" name="recovery-email" id="recovery-email" className="form-control" placeholder="somebody@example.com" onWrite={(event) => {this.mail = event.target.value}}/>
                {this.recoveryWarn}
              </div>
        			<div className="modal-footer">
        				<button type="button" className="btn btn-default" data-dismiss="modal" onClick = {() => {
                  this.dialog = false
                  store.dispatch({type: "initialize"})
                  store.dispatch(actions.refresh())
                }}>Cancel</button>
                <MButton type="button" className="btn btn-custom" label="Recovery" onClick = {() => {
                  store.dispatch(actions.sendResetMail(this.mail)).then() //then is used to wait for the result of the action
                  /*if(store.getState().status != undefined && store.getState().status.result == "success")*/
                    this.dialog = false
                  store.dispatch(actions.refresh())


                  //inserire qui la action per l'invio della mail per il reset della pw

                }}/>
        			</div>
        		</div>
        	</div>
      </Modal>
      </div>
  	)
  }
}

LogIn.contextTypes = {
  store : React.PropTypes.object
}

export default LogIn
