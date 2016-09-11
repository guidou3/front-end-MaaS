/*
* Name : ContactSupport.js
* Location : ./modules/containers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-07-29    Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MButton, MTextArea, MError} = Components
import {Alert} from 'react-bootstrap';
import Modal from 'react-modal'

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

class ContactSupport extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.account = "E-mail"
    this.dialog = false;
  }

  openModal() {
    const { store } = this.context
    if(store.getState().status.result != "error") {
      this.dialog= true;
      store.dispatch(actions.refresh())
    }
  }

  render() {
    const { store } = this.context
    this.account =""
    if(store.getState().loggedUser != 0) {
      this.account = store.getState().loggedUser.account
    }

    if(store.getState().status.result == "error") {
        this.warn = <MError/>
      }

      return (
        <div className="container">
  	     <div className="row">
          <form role="form" id="contact-form" className="contact-form">
            <h1 className="contact-title">Contact Us</h1>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                <script>
                  document.getElementById("email").setAttribute("disabled", true)
                </script>
                  <MTextBox type="text" className="form-control" name="Name" autoComplete="off" id="Name" placeholder="Name"
                    onWrite={(event) => {
                      this.name = event.target.value
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <MTextBox type="email" className="form-control" name="email" autoComplete="off" id="email" placeholder="Email" defaultLabel={this.account}
                    onWrite={(event) => {
                      this.account = event.target.value
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <MTextArea className="form-control textarea" rows="3" name="Message" id="Message" placeholder="Message" onWrite={(event) => {
                      this.message = event.target.value
                    }}
                  />
                </div>
              </div>
            </div>
            {this.warn}
            <div className="row">
              <div className="col-md-12">
                <MButton type="submit" className="btn main-btn pull-right"  onClick = {() => {
                  if(this.account, this.name, this.message != undefined){
                    this.message = "Sender: "+this.account+"\nName: "+this.name+"\nMessage: \n"+this.message
                    store.dispatch(actions.contactSupport({email:this.account, text:this.message}))
                    .then(() => (this.openModal()))
                  }
                  else {
                    this.warn =
                    <Alert bsStyle="danger">
                      <p>Every field must be filled.</p>
                    </Alert>
                    store.dispatch(actions.refresh())
                    console.log("So?");
                  }
                  console.log("Ebbene?");
                }} label ="Send a message">
                </MButton>
              </div>
            </div>
            </form>
          </div>
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
            				<h4 className="modal-title">Message sent!</h4>
            			</div>
            			<div className="modal-footer">
            				<button type="button" className="btn btn-default" data-dismiss="modal" onClick = {() => {
                      this.dialog = false
                      store.dispatch(actions.refresh())
                    }}>OK</button>
            			</div>
            		</div>
            	</div>
          </Modal>
        </div>
      )


  }
}

ContactSupport.contextTypes = {
  store : React.PropTypes.object
}

export default ContactSupport
