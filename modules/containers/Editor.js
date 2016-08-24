import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MTextArea, MButton} = Components
import Modal from 'react-modal'

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
          </h2>
        </div>
        <p></p>
        <MTextArea rows="20" cols="100" dfvalue = {dsli.code}
        onWrite={(event) => {
          dsli.code = event.target.value
          console.log(dsli.code)
        }} />

        <div className = "buttons">
          <MButton label = "Save" className="btn main-btn"
            onClick = {() => {
              store.dispatch(actions.saveTextDSLI(dsli)).then(() => (store.dispatch(actions.getDSLIList())))
          }}/>
          <MButton label = "Delete" className="btn main-btn"
            onClick = {() => {
              store.dispatch(actions.deleteDSLI(dsli.id)).then(() => (store.dispatch(actions.getDSLIList()))).then(() => (store.dispatch(actions.redirect('/home'))))
          }}/>
          <MButton label = "Clone" className="btn main-btn"
            onClick = {() => {
              store.dispatch(actions.cloneDSLI(dsli))
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
