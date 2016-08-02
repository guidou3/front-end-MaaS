import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import MTextBox from '../components/MTextBox'
import NavLink from '../components/NavLink'

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
        EMAIL <MTextBox
          boxType="text"
          onWrite={(event) => {
            this.user = event.target.value
          }}
        />
        <textarea rows="20" cols="20">

        </textarea>
        {this.warn}

        <button
          type = "button"
          onClick = {() => {
            store.dispatch(actions.attemptLogin(store, this.name, this.owner))
          }}>
          INVIA
        </button>
      </div>
  	)
  }
}

LogIn.contextTypes = {
  store : React.PropTypes.object
}

export default LogIn
