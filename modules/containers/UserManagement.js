/*
* Name : UserManagement.js
* Location : ./modules/containers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-02   Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Modal from 'react-modal'
import Components from '../components'
const {MTextBox, MButton, MUserRow, MError} = Components
import { Button } from 'react-bootstrap'

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

class MnUser extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.dialog = false
    this.user=1
  }

  render() {
    const { store } = this.context

    if(store.getState().status.result == "error") {
        this.warn = <MError/>
      }
    else {
        this.warn = ""
    }

    let comp = store.getState().userList

    let body = []
    let i
    let n = comp.length;
    for (i = 0; i < n; i++) {
      body[i] = <MUserRow user = {comp[i]}/>
    }
    return (
  	  <div className="userManagement">
        <div className="top">
          <h1 className="title">User Managment</h1>
          <Button bsClass="buttons btn" bsStyle="primary" onClick = {() => {
            this.dialog = true
            store.dispatch(actions.refresh())
          }}>
            Send Invite
          </Button>
        </div>
        <div className="table-responsive">
          <table id="mytable" className="table table-bordred table-striped">
            <thead>
              <tr>
                <th>Mail</th>
                <th>Access level</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {body}
            </tbody>
          </table>
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
          				<h4 className="modal-title">Invite new user!</h4>
          			</div>
          			<div className="modal-body">
          				<p>Insert the mail of the user to invite</p>
                  <MTextBox type="email" name="email" id="email" className="form-control" placeholder="example@example.com" onWrite={(event) => {this.user = event.target.value}}/>
                  <p>Insert the access level</p>
                  <select name="example" className="input-sm form-control" onChange = {(event) => {
                     this.level = event.target.value
                  }}>
                   <option value={1}>Member</option>
                   <option value={2}>Admin</option>
                  </select>
                </div>
          			<div className="modal-footer">
          				<button type="button" className="btn btn-default" data-dismiss="modal" onClick = {() => {
                    this.dialog = false
                    store.dispatch(actions.refresh())
                  }}>Cancel</button>
                  <MButton type="button" className="btn btn-custom" label="Send Invite" onClick = {() => {
                    console.log({mail:this.user, companyName:store.getState().loggedUser.company})
                    console.log(this.level)
                    store.dispatch(actions.userRegistration({mail:this.user, companyName:store.getState().loggedUser.company}, this.level))
                    .then(() => (store.dispatch(actions.getUserList())))
                    this.dialog = false
                    store.dispatch(actions.refresh())
                  }}/>
          			</div>
          		</div>
          	</div>
        </Modal>
        {this.warn}
      </div>
  	)
  }
}

MnUser.contextTypes = {
  store : React.PropTypes.object
}

export default MnUser
