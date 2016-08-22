import React, { Component, PropTypes } from 'react'

class MButton extends Component {

  render() {
    return (
      <button {...this.props}
        type = "button"
        onClick = {this.props.onClick}>
        {this.props.label}
      </button>
    )
  }
}

MButton.contextTypes = {
  store : React.PropTypes.object
}

export default MButton
