import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MButton} = Components

class ContactSupport extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.account = "E-mail"
  }

  render() {
    const { store } = this.context
    if(store.getState().loggedUser != 0) {
      this.account = store.getState().loggedUser.account
      document.getElementById("email").setAttribute("disabled", true)
    }

      return (
        <div className="container">
  	     <div className="row">
          <form role="form" id="contact-form" className="contact-form">
            <h1 className="contact-title">Contact Us</h1>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <MTextBox type="text" className="form-control" name="Name" autoComplete="off" id="Name" placeholder="Name"
                    onWrite={(event) => {
                      this.name = event.target.value
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <MTextBox type="email" className="form-control" name="email" autoComplete="off" id="email" placeholder={this.account}
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
                  <textarea className="form-control textarea" rows="3" name="Message" id="Message" placeholder="Message"></textarea>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <MButton type="submit" className="btn main-btn pull-right" value="Send a message" onClick = {() => {
                  //store.dispatch(actions.
                  //inserire qui la action per l'invio della mail al supporto
                  store.dispatch(actions.redirect('/'))
                }}/>
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
