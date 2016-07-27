import React, { Component, PropTypes } from 'react'
import Counter from '../components/Counter'
import MTextBox from '../components/MTextBox'
import * as actions from '../actions/RootAction'
import { routerMiddleware, push } from 'react-router-redux'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
  }

  render() {
    const { store } = this.context
    return (
  	  <div>
        <h2>SignIn</h2>
        NOME AZIENDA <MTextBox
          onWrite={(event) => {
            this.name = event.target.value
          }}
        />
        PROPRIETARIO <MTextBox
          onWrite={(event) => {
            this.owner = event.target.value
          }}
        />
        {this.warn}

        <button
          type = "button"
          onClick = {() => {
            store.dispatch(actions.signCompany(store, this.name, this.owner))
          }}>
          SIGN IN
        </button>
      </div>
  	)
  }
}

SignIn.contextTypes = {
  store : React.PropTypes.object
}

export default SignIn
