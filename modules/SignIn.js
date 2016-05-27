
import React, { Component, PropTypes } from 'react'
import Counter from './Counter'

class SignIn extends Component {
  render() {
    const { store } = this.context
    return (
  	  <div>
        <h2>Login</h2>
  		  <Counter
          value={store.getState()}
          onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
          onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        />
      </div>
  	)
  }
}

SignIn.contextTypes = {
  store : React.PropTypes.object
}

export default SignIn
