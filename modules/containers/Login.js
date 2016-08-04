import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MButton, MLink} = Components

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
  }

  render() {
    const { store } = this.context
    return (
  	  <div>
        <h2>LogIn</h2>
        <div>
        TUA EMAIL <MTextBox
          boxType="text"
          onWrite={(event) => {
            this.user = event.target.value
          }}
        />
        </div>
        <div>
        PASSWORD <MTextBox
          boxType="password"
          onWrite={(event) => {
            this.pwd = event.target.value
          }}
        />
        </div>

        {this.warn}

        <MButton label = "LOG IN"
          onClick = {() => {
            store.dispatch(actions.attemptLogin(store, this.name, this.owner))
        }}/>
        <MLink to="/login/reacc">Password Dimenticata?</MLink >
      </div>
  	)
  }
}

LogIn.contextTypes = {
  store : React.PropTypes.object
}

export default LogIn
