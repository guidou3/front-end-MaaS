import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Modal from 'react-modal'
import Components from '../components'
const {MTextBox, MButton, MUserRow} = Components

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
  }

  render() {
    const { store } = this.context
    let comp = store.getState().userList

    let body = []
    let i
    let n = comp.length;
    for (i = 0; i < n; i++) {
      body[i] = <MUserRow user = {comp[i]}/>
    }
    return (
  	  <div className="userManagement">
        <h2>User Managment</h2>
        <div className="form-group">
            <label htmlFor="email" className="sr-only">Email</label>
            <MTextBox boxType="text" name="email" id="email" className="form-control" placeholder="somebody@example.com" onWrite={(event) => {this.user = event.target.value}}/>
            <MButton label = "Send Invite" className="btn-lg btn main-btn "
              onClick = {() => {
                this.dialog = true
                store.dispatch(actions.checkUsername(this.user))
                store.dispatch(actions.userRegistration({ownerMail:this.user, companyName:store.getState().loggedUser.company, dutyId:2})).then(() => (store.dispatch(actions.getUserList())))
            }}/>
        </div>
        <div className="table-responsive">
          <table id="mytable" className="table table-bordred table-striped">
            <thead>
              <tr>
                <th>Mail</th>
                <th>Access level</th>
                <th>Profile</th>
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
          				<h4 className="modal-title">Invite sent</h4>
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
        {this.warn}
      </div>
  	)
  }
}

MnUser.contextTypes = {
  store : React.PropTypes.object
}

export default MnUser
