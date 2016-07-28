import React, { Component, PropTypes } from 'react'
import MTextBox from '../components/MTextBox'
import * as actions from '../actions/RootAction'
import { routerMiddleware, push } from 'react-router-redux'

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
  }

  render() {
    const { store } = this.context
    return (
  	  <div>
        <h2>SignIn</h2>
        EMAIL <MTextBox
          boxType="text"
          onWrite={(event) => {
            this.user = event.target.value
          }}
        />
        PASSWORD <MTextBox
          boxType="password"
          onWrite={(event) => {
            this.pwd = event.target.value
          }}
        />
        {this.warn}

        <button
          type = "button"
          onClick = {() => {
            store.dispatch(actions.attemptLogin(store, this.name, this.owner))
          }}>
          LOG IN
        </button>
      </div>
  	)
  }
}

LogIn.contextTypes = {
  store : React.PropTypes.object
}

export default LogIn
