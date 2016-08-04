import React, { Component, PropTypes } from 'react'

class MTextBox extends Component {

  render() {
    return (
      <input type={this.props.boxType} onChange={this.props.onWrite} value={this.props.value}/>
    )
  }
}

MTextBox.contextTypes = {
  store : React.PropTypes.object
}

export default MTextBox
