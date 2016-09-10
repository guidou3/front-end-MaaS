import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MButton,  MError} = Components
import { Button } from 'react-bootstrap'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
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

    this.image = 'http://i.stack.imgur.com/HQwHI.jpg'
    return (
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
              <Button bsSize="large" bsStyle="primary"  onClick = {() => {
                store.dispatch(actions.sendResetMail(store.getState().loggedUser.account))
                store.dispatch(actions.redirect("/home"))
              }}>
                Change password
              </Button>
            </div>

        </div>
      </div>
  	)
  }
}

Profile.contextTypes = {
  store : React.PropTypes.object
}

export default Profile
