/*
* Name : Profile.js
* Location : ./modules/containers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-16   Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MButton,  MError} = Components
import { Button } from 'react-bootstrap'
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

class Profile extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.dialog = false
  }
  openModal() {
    const { store } = this.context
    if(store.getState().status.result != "error"){
      this.dialog = true
      store.dispatch(actions.refresh())
    }
  }

  render() {
    const { store } = this.context

    if(store.getState().status.result == "error") {
        this.warn = <MError/>
      }
    else {
        this.warn = ""
    }
    let role =""
    let n = store.getState().loggedUser.accessLevel
    if(n==1) role = "Member"
    else if (n==2) role = "Admin"
    else if (n==3) role = "Owner"
    else if (n==9) role = "Super Admin"

    this.image = 'http://i.stack.imgur.com/HQwHI.jpg'
    return (
      <div>
        <div className="container">
          <div>
              <div>
                <h1>Profile</h1>
                <div className="form-group profile">
                    <h4>Email: </h4>
                    <MTextBox type="email" name="email" id="email" className="form-control" value= {store.getState().loggedUser.account} disabled="true"/>
                </div>
                <div className="form-group profile">
                    <h4>Company: </h4>
                    <MTextBox type="text" name="email" id="email" className="form-control" value= {store.getState().loggedUser.company} disabled="true"/>
                </div>
                <div className="form-group profile">
                  <h4>Role: </h4>
                    <MTextBox type="text" name="email" id="email" className="form-control" value= {role} disabled="true"/>
                </div>
                {this.warn}
                <Button bsSize="large" bsStyle="primary"  onClick = {() => {
                  store.dispatch(actions.sendResetMail(store.getState().loggedUser.account))
                  .then(() => (this.openModal()))
                }}>
                  Change password
                </Button>
              </div>
          </div>
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
          				<h4 className="modal-title">Email sent!</h4>
                  <p>Check your e-mail to reset your passoword!</p>
          			</div>
          			<div className="modal-footer">
                  <MButton type="button" className="btn btn-custom" label="OK" onClick = {() => {
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

Profile.contextTypes = {
  store : React.PropTypes.object
}

export default Profile
