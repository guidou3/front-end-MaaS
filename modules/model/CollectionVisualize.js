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
    let data = this.props.data
    let header = this.props.header.indexColumns
    for (let i = 0; i < header.length; i++) {
      var r = header[i].name.split('.');
      var value
      if(r.length > 1){
        if(data[r[0]] && data[r[0]][r[1]])
          value = data[r[0]][r[1]]
        else
          value = '/'
      }
      else{
        if(data[r[0]])
          value = data[r[0]]
        else
          value = '/'
      }
      if(header[i].selectable){
        console.log(this.props.boss.props);
        body[i] = <td><a href={"/execdsli?ID="+this.props.boss.props.dsli.id+"&SHOW="+this.props.boss.JSON.data.result[i]._id} className="show" onClick = {() => {

        }}>{value.toString()}</a></td>
      }
      else
        body[i] = <td>{value.toString()}</td>
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
      body[i] = <CollectionRow boss={this} header={prop} data={this.JSON.data.result[i]}/>
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
