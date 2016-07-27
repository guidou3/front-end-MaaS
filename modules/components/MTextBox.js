import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'

class Form extends Component {

  constructor(props) {
    super(props)
    this.warn = ""
  }

  render() {
    const { onWrite } = this.props
    return (
      <div>
          <input type='password' onChange={onWrite}/>
      </div>
    )
  }
}



Form.contextTypes = {
  store : React.PropTypes.object
}

export default Form
