/*jshint esversion: 6 */
/*
 * Name : CollectionVisualize.js
 * Location : ./modules/model/
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.1.0           2016-09-08     Berselli Marco
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
    let body = []
    let data = this.props.data
    let header = this.props.header.indexColumns
    for (let i = 0; i < header.length; i++) {
      try{
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
          console.log(this.props.boss.props.guest);
          if(this.props.boss.props.guest)
            body[i] = <td><a href={"/execdsli?ID="+this.props.boss.props.dsli.id+"&GUEST="+this.props.boss.props.guest+"&SHOW="+data._id} className="show">{value.toString()}</a></td>
          else
            body[i] = <td><a href={"/execdsli?ID="+this.props.boss.props.dsli.id+"&SHOW="+data._id} className="show">{value.toString()}</a></td>
        }
        else
          body[i] = <td>{value.toString()}</td>

      }catch(err){
        body[i] = <td>{err.toString()}</td>
      }
    }

    return (<tr>{body}</tr>)
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
    let headers = this.JSON.properties.indexColumns
    let n = headers.length
    let text = ""
    for (let i = 0; i < n; i++) {
      text += headers[i].label+";"
    }
    for (let i = 0; i < Object.keys(this.JSON.data.result).length; i++) {
      let data = this.JSON.data.result[i]
      text += "\n"
      for (let j = 0; j < n; j++) {
        var r = headers[j].name.split('.');
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
      }
    }

    Save(text, this.dsli.name+'.csv')
  }

  saveJSON() {
    let headers = this.JSON.properties.indexColumns
    let n = headers.length
    let array = []
    for (let i = 0; i < Object.keys(this.JSON.data.result).length; i++) {
      let data = this.JSON.data.result[i]
      array[i] = new Object()
      for (let j = 0; j < n; j++) {
        var r = headers[j].name.split('.');
        var value
        if(r.length > 1){
          if(data[r[0]] && data[r[0]][r[1]])
            value = data[r[0]][r[1]]
          else
            value = '/'
          if(!array[i][r[0]])
            array[i][r[0]] = new Object()
          array[i][r[0]][r[1]] = value
        }
        else{
          if(data[r[0]])
            value = data[r[0]]
          else
            value = '/'
          array[i][r[0]] = value
        }
      }
    }

    Save(JSON.stringify(array), this.dsli.name+'.json')
  }

  render() {
    let prop = this.JSON.properties
    let header = []
    let n = prop.indexColumns.length
    for (let i = 0; i < n; i++) {
      header[i] = <th>{prop.indexColumns[i].label}</th>
    }

    let body = []
    for (let i = 0; i < Object.keys(this.JSON.data.result).length; i++) {
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
