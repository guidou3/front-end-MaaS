import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MTextArea, MButton} = Components

class CollectionVisualize extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    console.log("VISUALIZE JSON :");
    console.log(this.props.JSON);
    this.JSON = this.props.JSON
    this.dsli = this.props.dsli
  }

  render() {
    let prop = this.JSON.properties
    console.log(this.JSON);
    return (
      <div>
        <div className = "DSLITitle">
          <h2>
            {this.dsli.name}
          </h2>
        </div>
        <div className="table-responsive">
          <table id="mytable" className="table table-bordred table-striped">
            <tbody>
            <tr><th>{prop.label}</th></tr>
            <tr><td>{this.JSON.data.result[0]['_id']}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

CollectionVisualize.contextTypes = {
  store : React.PropTypes.object
}

export default CollectionVisualize
