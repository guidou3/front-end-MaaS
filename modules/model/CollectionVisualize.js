import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MTextArea, MButton} = Components

class CollectionRow extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let body = []
    let dsli = this.props.dsli
    let header = this.props.header.indexColumns
    for (let i = 0; i < header.length; i++) {
      var r = header[i].name.split('.');
      if(r.length > 1){
        if(dsli[r[0]] && dsli[r[0]][r[1]])
          body[i] = <td>{dsli[r[0]][r[1]].toString()}</td>
        else
          body[i] = <td>/</td>
      }
      else{
        if(dsli[r[0]])
          body[i] = <td>{dsli[r[0]].toString()}</td>
        else
          body[i] = <td>/</td>
      }
    }

    return (
      <tr>
        {body}
      </tr>
    )
  }
}

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
    let header = []
    let n = prop.indexColumns.length
    for (let i = 0; i < n; i++) {
      header[i] = <th>{prop.indexColumns[i].label}</th>
    }
    let body = []
    //console.log(Object.keys(this.JSON.data.result).length);
    for (let i = 0; i < Object.keys(this.JSON.data.result).length; i++) {
    //  console.log(this.JSON.data.result[i]);
      body[i] = <CollectionRow header={prop} dsli={this.JSON.data.result[i]}/>
    }
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
              <tr>{header}</tr>
              {body}
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
