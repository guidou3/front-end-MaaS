/*
* Name : Editor.js
* Location : ./modules/containers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-09   Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MTextArea, MButton, MError} = Components
import Modal from 'react-modal'
import { Button, Alert } from 'react-bootstrap'

import {compileDSLI} from '../utils/DSLICompiler';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    //backgroundColor   : 'rgba(0, 0, 0, 0.5)'
  },
  content : {
    position          : 'absolute',
    top               : '50%',
    left              : '50%',
    right             : 'none',
    bottom            : 'none',
    marginRight       : 'none',
    //background        : 'rgba(0, 0, 0, 0.5)',
    outline           : 'none',
    borderRadius      : 'none',
    transform         : 'translate(-50%, -50%)',
    border            : 'none',
    padding           : 'none'
  }
};

class EditorAce extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    function onWrite(newValue) {
      dsli.code = newValue
    }
    let dsli = this.props.data;
    let bool = this.props.bool;
    return (
      <AceEditor
        mode="javascript"
        theme="monokai"
        name="EditorAce"
        height="30em"
        width="95%"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          readOnly: bool,
          tabSize: 4,
          fontSize: 14,
          showGutter: true,
          showPrintMargin: false
        }}
        value={dsli.code}
        onChange={onWrite}
      />
    )
  }
}

class MSelectData extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <option value={this.props.data.id}>
        {this.props.db == this.props.data.id ? this.props.data.tag+ "\u2713" : this.props.data.tag}
      </option>
    )
  }
}


class Editor extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.name = "SampleDSLI"
    this.dialog = false
  }

  render() {
    const { store } = this.context

    if(store.getState().status.result == "error") {
        this.warn = <MError/>
      }

    let save = false
    let del = false

    let dsli = store.getState().currentDSLI
    let comp = store.getState().dataList
    let rows = [];

    let i
    let n = comp.length;
    for (i = 0; i < n; i++) {
      rows[i] = <MSelectData data = {comp[i]} db = {dsli.databaseId}/>
    }
    if(dsli.permits < 3 && dsli.permits != 0 && store.getState().loggedUser.accessLevel < 2){
      save = true;
      del = true;
    }
    if(!dsli.databaseId)
      dsli.databaseId = comp[0].id;
    let combobox = ""
    if(save == true) {
      combobox =
           <div className="form-group">
            <div className="data-label">
              <h3> Database:   </h3>
            </div>
            <select className="form-control" defaultValue={dsli.databaseId} disabled onChange = {(event) => {
               dsli.databaseId = event.target.value;
             }}>
             {rows}
           </select>
          </div>
    }
    else {
      combobox =
           <div className="form-group">
            <div className="data-label">
              <h3> Database:   </h3>
            </div>
            <select className="form-control" defaultValue={dsli.databaseId} onChange = {(event) => {
               dsli.databaseId = event.target.value;
             }}>
             {rows}
           </select>
          </div>
    }
    let result = "primary"

    return (
  	  <div className= "Editor">
        <div className = "top">
          <h1 className = "title">
            {dsli.name}
          </h1>
          <Button bsClass="buttons btn" bsStyle="primary" disabled={save} onClick = {() => {
            this.dialog = true
            store.dispatch(actions.refresh())
          }}>
            Rename DSLI
          </Button>
        </div>
            {combobox}

        <EditorAce data={dsli} bool={save}/>
        {this.warn}
        <div className = "buttons">
          <Button bsSize="lg" bsStyle="primary" disabled={save} onClick = {() => {
            store.dispatch(actions.saveTextDSLI(dsli))
              .then(() => (store.dispatch(actions.getDSLIList())))
          }}>
            Save
          </Button>


          <Button bsSize="lg" bsStyle={result} disabled={save} onClick = {() => {
            var error = compileDSLI(dsli.code, (errback) => {  })
            if(error.err != undefined){
                this.warn =
                <Alert  bsStyle="danger" bsClass="alert-danger check-error">
                  <p>{error.err}</p>
                </Alert>
              }
            else {
              this.warn =
              <Alert  bsStyle="success" bsClass="alert-success check-error">
                <p>There are not any errors. </p>
              </Alert>
            }
            store.dispatch(actions.refresh())
          }}>
            Check Syntax
          </Button>


          <Button bsSize="lg" bsStyle="primary" onClick = {() => {
            store.dispatch(actions.cloneDSLI(dsli))
            store.dispatch(actions.redirect('/home'))
          }}>
            Clone
          </Button>
          <Button bsSize="lg" bsStyle="danger" disabled={del} onClick = {() => {
            store.dispatch(actions.deleteDSLI(dsli.id))
            .then(() => (store.dispatch(actions.getDSLIList())))
            .then(() => (store.dispatch(actions.redirect('/home'))))
          }}>
            Delete
          </Button>
        </div>
        <Modal isOpen= {this.dialog} style={customStyles} transparent={true}>
          	<div className="modal-dialog modal-sm">
          		<div className="modal-content">
          			<div className="modal-header">
          				<button type="button" className="close" data-dismiss="modal" onClick = {() => {
                    this.dialog = false
                    store.dispatch(actions.refresh())
                  }}>
          					<span aria-hidden="true">×</span>
          					<span className="sr-only">Close</span>
          				</button>
          				<h4 className="modal-title">Insert a new Name for this DSLI</h4>
          			</div>
          			<div className="modal-body">
          				<p>Insert the nome of the DSLI</p>
                  <MTextBox type="DSLIName" name="DSLIName" id="DSLIName" className="form-control" placeholder="Name" onWrite={(event) => {this.name = event.target.value}}/>
          			</div>
          			<div className="modal-footer">
          				<button type="button" className="btn btn-default" data-dismiss="modal" onClick = {() => {
                    this.dialog = false
                    store.dispatch(actions.refresh())
                  }}>Cancel</button>
                  <MButton type="button" className="btn btn-custom" label="Rename" onClick = {() => {
                    if(this.name)
                      dsli.name = this.name
                    //store.dispatch(actions.renameDSLI())
                    this.dialog = false
                    store.dispatch(actions.refresh())
                  }}/>
          			</div>
          		</div>
          	</div>
        </Modal>
      </div>
  	)
  }
}

Editor.contextTypes = {
  store : React.PropTypes.object
}

export default Editor
