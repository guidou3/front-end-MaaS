import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'

class Form extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { store } = this.context
    let credentials = {email: '-', password: '-'}
    return (
      <div>
          <input ref={node => { credentials.email = node }} />
          <input type='password' onChange={ () => {credentials.password = event.target.value}}/>
          <button onClick ={ () => {
              store.dispatch(actions.attemptLogin(store, credentials))}
          }>
            Add Todo
          </button>
      </div>
    )
  }
}

Form.contextTypes = {
  store : React.PropTypes.object
}

export default Form
