import React, { Component, PropTypes } from 'react'
import Counter from '../containers/Counter'
import * as actions from '../actions/RootAction'

class SignIn extends Component {
  render() {
    const { store } = this.context
    return (
  	  <div>
        <h2>SignIn</h2>
  		  <Counter
          value={store.getState().basicReducer}
          onIncrement={() => store.dispatch( actions.incrementCounter() )}
          onDecrement={() => store.dispatch( actions.decrementCounter() )}
        />
      </div>
  	)
  }
}

SignIn.contextTypes = {
  store : React.PropTypes.object
}

export default SignIn
