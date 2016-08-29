import React, { Component, PropTypes } from 'react'

class MTextBox extends Component {

  render() {
    return (
      <input {...this.props}  onChange={this.props.onWrite} defaultValue={this.props.defaultLabel}/>
    )
  }
}

MTextBox.contextTypes = {
  store : React.PropTypes.object
}

export default MTextBox
