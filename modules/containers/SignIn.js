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
  		  <Counter
          onIncrement={() => store.dispatch( actions.incrementCounter() )}
          onDecrement={() => store.dispatch( actions.decrementCounter() )}
        />
        <MTextBox
          onWrite={(event) => {
            this.value = event.target.value
            let w
            if(this.value.length > 3)
              w = "Too Long Didn't Read"
            else
              w = ""
            if(w != this.warn){
              this.warn = w;
              store.dispatch(actions.refresh())
            }
          }}
        />
        {this.warn}
      </div>
  	)
  }
}

SignIn.contextTypes = {
  store : React.PropTypes.object
}

export default SignIn
