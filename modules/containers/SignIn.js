import React, { Component, PropTypes } from 'react'
import Modal from 'react-modal'
import Components from '../components'
const {MTextBox, MButton, MLink} = Components
import * as actions from '../actions/RootAction'
import { routerMiddleware, push } from 'react-router-redux'

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

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.dialog = false
  }

  render() {
    const { store } = this.context

    if(store.getState().status.validity != undefined && store.getState().status.validity.username == true)
      this.dialog = true

    return (
      <div>
      <section id="signin">
          <div className="container">
          	<div className="row">
          	    <div className="col-xs-12">
              	    <div className="form-wrap">
                      <h1>Sign in</h1>
                          <form role="form" action="javascript:;" method="post" id="signin-form" autoComplete="off">
                              <div className="form-group">
                                  <label htmlFor="companyName" className="sr-only">Company name</label>
                                  <MTextBox type="companyName" name="companyName" id="companyName" className="form-control" placeholder="Company name" onWrite={(event) => {this.name = event.target.value}}/>
                              </div>
                              <div className="form-group">
                                  <label htmlFor="owner" className="sr-only">Email</label>
                                  <MTextBox type="owner" name="owner" id="owner" className="form-control" placeholder="somebody@example.com" onWrite={(event) => {this.owner = event.target.value}}/>
                              </div>
                              {this.warn}
                              <MButton type="submit" id="btn-login" className="btn btn-custom btn-lg btn-block" label="Sign up" onClick = {() => {
                                let data = {
                                  companyName: this.name,
                                  ownerMail: this.owner
                                }
                                store.dispatch(actions.checkCompanyName(data))
                                this.dialog = true
                              }}/>
                          </form>
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
        				<h4 className="modal-title">Company registered!</h4>
                <p>Check your e-mail to login!</p>
        			</div>
        			<div className="modal-footer">
                <MButton type="button" className="btn btn-custom" label="OK" onClick = {() => {
                  this.dialog = false
                  store.dispatch(actions.redirect('/'))
                }}/>
        			</div>
        		</div>
        	</div>
      </Modal>
      </div>
  	)
  }
}

SignIn.contextTypes = {
  store : React.PropTypes.object
}

export default SignIn
