import React, { Component, PropTypes } from 'react'

class ErrDisplay extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { store } = this.context
    const value = store.getState().sys;
    return (
      <p>
        {value}
      </p>
    )
  }
}

ErrDisplay.contextTypes = {
  store : React.PropTypes.object
}

export default ErrDisplay
