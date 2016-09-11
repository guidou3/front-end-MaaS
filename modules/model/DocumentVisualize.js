/*jshint esversion: 6 */
/*
 * Name : DocumentVisualize.js
 * Location : ./modules/model/
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.1.0           2016-09-08    Roberto D'Amico
 * -------------------------------------------------
 * Codifica modulo
 * =================================================
 */
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MTextArea, MButton} = Components
import { DropdownButton, MenuItem } from 'react-bootstrap'
import Save from 'react-file-download'

class CollectionRow extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    try{
      let body = []
      let dsli = this.props.dsli
      let header = this.props.header.rows
      let row = this.props.row

      body[0] = <td><b>{header[row].label.toString()}</b></td>

      var r = header[row].name.split('.');
      if(r.length > 1){
        if(dsli[r[0]] && dsli[r[0]][r[1]])
          body[1] = <td>{dsli[r[0]][r[1]].toString()}</td>
        else
          body[1] = <td>/</td>
      }
      else{
        if(dsli[r[0]])
          body[1] = <td>{dsli[r[0]].toString()}</td>
        else
          body[1] = <td>/</td>
      }

      return (<tr>{body}</tr>)

    }catch(err){
      return (<tr><td><b>Error:</b></td><td>DSLI may be invalid</td></tr>)
    }
  }
}

class CollectionVisualize extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.JSON = this.props.JSON
    this.dsli = this.props.dsli
  }

  saveCSV() {
    let headers = this.JSON.properties.rows
    let n = headers.length
    let text = ""
    for (let i = 0; i < n; i++) {
      text += headers[i].label+";"
      let data = this.JSON.data.result[0]
      var r = headers[i].name.split('.');
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
      text += value.toString()+";"
      text += "\n"
    }

    Save(text, this.dsli.name+'.csv')
  }

  saveJSON() {
    let headers = this.JSON.properties.rows
    let n = headers.length
    let result = new Object()
    let data = this.JSON.data.result[0]

    for (let j = 0; j < n; j++) {
      var r = headers[j].name.split('.');
      var value
      if(r.length > 1){
        if(data[r[0]] && data[r[0]][r[1]])
          value = data[r[0]][r[1]]
        else
          value = '/'
        if(!result[r[0]])
          result[r[0]] = new Object()
        result[r[0]][r[1]] = value
      }
      else{
        if(data[r[0]])
          value = data[r[0]]
        else
          value = '/'
        result[r[0]] = value
      }
    }

    Save(JSON.stringify(result), this.dsli.name+'.json')
  }

  render() {
    let prop = this.JSON.properties
    let body = []
    let n = prop.rows.length

    for (let i = 0; i < n; i++) {
      body[i] = <CollectionRow header={prop} dsli={this.JSON.data.result[0]} row ={i}/>
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
              {body}
            </tbody>
          </table>
        </div>
        <DropdownButton bsStyle="primary" title="Export">
          <MenuItem eventKey="1" onSelect={() => {
            this.saveCSV()
          }}>Export csv</MenuItem>
          <MenuItem eventKey="2" onSelect={() => {
            this.saveJSON()
          }}>Export json</MenuItem>
        </DropdownButton>
      </div>
    )
  }
}

CollectionVisualize.contextTypes = {
  store : React.PropTypes.object
}

export default CollectionVisualize
