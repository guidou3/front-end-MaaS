import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MButton, MTextArea} = Components
import {Alert} from 'react-bootstrap';

class ContactSupport extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.account = "E-mail"
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
    else {
        this.warn = ""
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
                  }
                  console.log("Ebbene?");
                }} label ="Send a message">
                </MButton>
              </div>
            </div>
            </form>
          </div>
        </div>
      )


  }
}

ContactSupport.contextTypes = {
  store : React.PropTypes.object
}

export default ContactSupport
