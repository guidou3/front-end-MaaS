import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MTextArea, MButton} = Components
import Save from 'react-file-download'

class CollectionVisualize extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.JSON = this.props.JSON
    this.dsli = this.props.dsli
    this.saveJSON()
  }

  saveCSV() {
    let text = ""+this.JSON.properties.label+"\n"+this.JSON.data.result[0]['_id'];
    Save(text, this.dsli.name+'.csv');
  }

  saveJSON() {
    Save(JSON.stringify(this.JSON.data.result[0]), this.dsli.name+'.json');
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
            <tr><td>{this.JSON.data.result[0][prop.select]}</td></tr>
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
