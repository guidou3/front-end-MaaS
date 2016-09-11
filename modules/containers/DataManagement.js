/*
* Name : DataManagement.js
* Location : ./modules/containers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-07-30    Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Modal from 'react-modal'
import Components from '../components'
const {MTextBox, MButton, MDataRow, MError} = Components
import { Button, DropdownButton, MenuItem } from 'react-bootstrap'

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
    width             : '40%',
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

class MnData extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.dialog = false
  }

  render() {
    const { store } = this.context

    if(store.getState().status.result == "error") {
        this.warn = <MError/>
      }
    else {
        this.warn = ""
    }

    let comp = store.getState().dataList

    let body = []
    let i
    let n = comp.length;
    for (i = 0; i < n; i++) {
      body[i] = <MDataRow data = {comp[i]}/>
    }
    return (
  	  <div className="home">
        <div className="top">
          <h1 className="title">Database Managment</h1>
          <div className="buttons">
            <Button bsStyle="primary" onClick = {() => {
              this.dialog = true
              store.dispatch(actions.refresh())
            }}>
              Add database
            </Button>
            <Button bsStyle="primary" onClick = {() => {
              store.dispatch(actions.refresh())
            }}>
              Refresh
            </Button>
          </div>
        </div>
        <div className="table-responsive">
          <table id="mytable" className="table table-bordred table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Id</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {body}
            </tbody>
          </table>
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
          				<h4 className="modal-title">Add a new database connection</h4>
          			</div>
          			<div className="modal-body">
          				<p>Type a name for the database</p>
                  <MTextBox type="text" name="name" id="new-db" className="form-control" placeholder="Name" onWrite={(event) => {this.name = event.target.value}}/>
                  <p>Type a name for the database</p>
                  <MTextBox type="text" name="uri" id="new-db-uri" className="form-control" placeholder="URI" onWrite={(event) => {this.uri = event.target.value}}/>
          			</div>
          			<div className="modal-footer">
          				<button type="button" className="btn btn-default" data-dismiss="modal" onClick = {() => {
                    this.dialog = false
                    store.dispatch(actions.refresh())
                  }}>Cancel</button>
                  <MButton type="button" className="btn btn-custom" label="Add" onClick = {() => {
                    if(this.uri == undefined || this.name == undefined){
                      this.warn = "Please compile all data fields";
                    }
                    else {
                      store.dispatch(actions.addDatabase({uri: this.uri, tag: this.name}))
                        .then(() => (store.dispatch(actions.getDatabase())))
                    }
                    this.dialog = false
                    store.dispatch(actions.refresh())
                  }}/>
          			</div>
          		</div>
          	</div>
        </Modal>
        {this.warn}
      </div>
  	)
  }
}

MnData.contextTypes = {
  store : React.PropTypes.object
}

export default MnData
