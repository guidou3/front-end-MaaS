import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MTextArea, MButton} = Components
import Modal from 'react-modal'
import brace from 'brace';
import AceEditor from 'react-ace';

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
    return (
      <AceEditor
        mode="javascript"
        theme="monokai"
        name="EditorAce"
        height="30em"
        width="90%"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
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
    const { store } = this.context
    return (
      <option value={this.props.data.tag}>
        {this.props.db == this.props.data.tag ? this.props.data.tag+ "\u2713" : this.props.data.tag}
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
    let dsli = store.getState().currentDSLI
    let comp = store.getState().dataList
    let rows = [];

    let i
    let n = comp.length;
    for (i = 0; i < n; i++) {
      rows[i] = <MSelectData data = {comp[i]} db = {dsli.databaseId}/>
    }
    let combobox =
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

    let save = (<MButton label = "Save" className="btn main-btn"
                onClick = {() => {
                  store.dispatch(actions.saveTextDSLI(dsli)).then(() => (store.dispatch(actions.getDSLIList())))
                  console.log(dsli);
              }}/>)

    let del = (<MButton label = "Delete" className="btn main-btn"
                onClick = {() => {
                  store.dispatch(actions.deleteDSLI(dsli.id)).then(() => (store.dispatch(actions.getDSLIList()))).then(() => (store.dispatch(actions.redirect('/home'))))
              }}/>)
    if(dsli.permits < 3 && dsli.permits != 0 && store.getState().loggedUser.accessLevel < 2){
      save = null
      del = null
    }
    return (
  	  <div className= "Editor">
        <div className = "DSLITitle">
          <h2>
            {dsli.name}
            <MButton label = "Rename DSLI" className="btn main-btn"
              onClick = {() => {
                this.dialog = true
                store.dispatch(actions.refresh())
            }}/>
            {combobox}
          </h2>
        </div>
        <EditorAce data={dsli}/>

        <div className = "buttons">
          {save}
          {del}
          <MButton label = "Clone" className="btn main-btn"
            onClick = {() => {
              store.dispatch(actions.cloneDSLI(dsli))
              store.dispatch(actions.redirect('/home'))
          }}/>
        </div>

        {this.warn}
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
