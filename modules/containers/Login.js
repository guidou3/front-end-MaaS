import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Modal from 'react-modal'
import Components from '../components'
const {MTextBox, MButton, MLink} = Components

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
    this.dialog = false
  }

  render() {
    const { store } = this.context
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
        			</div>
        			<div className="modal-footer">
        				<button type="button" className="btn btn-default" data-dismiss="modal" onClick = {() => {
                  this.dialog = false
                  store.dispatch(actions.refresh())
                }}>Cancel</button>
                <MButton type="button" className="btn btn-custom" value="Recovery" onClick = {() => {
                  //store.dispatch(actions.
                  //inserire qui la action per l'invio della mail per il reset della pw
                  this.dialog = false
                  store.dispatch(actions.refresh())
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
