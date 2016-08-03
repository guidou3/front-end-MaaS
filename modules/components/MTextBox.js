import React, { Component, PropTypes } from 'react'

class Form extends Component {

  render() {
    return (
      <div>
          <input type={this.props.boxType} onChange={this.props.onWrite} value={this.props.value}/>
      </div>
    )
  }
}

Form.contextTypes = {
  store : React.PropTypes.object
}

export default Form
