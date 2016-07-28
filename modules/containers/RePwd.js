import React, { Component, PropTypes } from 'react'
import MTextBox from '../components/MTextBox'
import * as actions from '../actions/RootAction'
import { routerMiddleware, push } from 'react-router-redux'

class RePwd extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
  }

  render() {
    const { store } = this.context
    return (
  	  <div>
        <h2>RecoverPassword</h2>
        EMAIL <MTextBox
          boxType="text"
          onWrite={(event) => {
            this.user = event.target.value
          }}
        />
        {this.warn}

        <button
          type = "button"
          onClick = {() => {
            store.dispatch(actions.attemptLogin(store, this.name, this.owner))
          }}>
          SEND EMAIL
        </button>
      </div>
  	)
  }
}

RePwd.contextTypes = {
  store : React.PropTypes.object
}

export default RePwd
