/*
* Name : HomePage.js
* Location : ./modules/containers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-07   Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MButton, MDSLIRow, MTextBox, MError} = Components
import Modal from 'react-modal'
import { Button } from 'react-bootstrap'

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

class Dashboard extends Component {
  constructor(props) {
      super(props)
      this.warn = ""
      this.newDSLI = false
      this.cloneDSLI = false
    }
  render() {

    const {store} = this.context

    if(store.getState().status.result == "error") {
        this.warn = <MError/>
      }
    else {
        this.warn = ""
    }

    let comp = store.getState().DSLIList

    let body = []
    let i
    let n = comp.length;
    for (i = 0; i < n; i++) {
      if(comp[i].permits > 0 || comp[i].accountId == store.getState().loggedUser.account)
        body[i] = <MDSLIRow key={comp[i].id} data = {comp[i]} showPermits = {false}/>
    }
    return (
	  <div className="home">
      <div className="top">
        <h1 className="title">Welcome to Your Home Page</h1>
        <div className="buttons">
          <Button bsStyle="primary" onClick = {() => {
            this.newDSLI = true
            store.dispatch(actions.refresh())
          }}>
            Create DSLI
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
                <th>Last Modified</th>
                <th>Type</th>
                <th>Author</th>
                <th>Edit</th>
                <th>Clone</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {body}
            </tbody>
          </table>
        </div>
        <Modal isOpen= {this.newDSLI} style={customStyles} transparent={true}>
          	<div className="modal-dialog modal-sm">
          		<div className="modal-content">
          			<div className="modal-header">
          				<button type="button" className="close" data-dismiss="modal" onClick = {() => {
                    this.newDSLI = false
                    store.dispatch(actions.refresh())
                  }}>
          					<span aria-hidden="true">×</span>
          					<span className="sr-only">Close</span>
          				</button>
          				<h4 className="modal-title">Create DSLI</h4>
          			</div>
          			<div className="modal-body">
          				<p>Insert the nome of the DSLI</p>
                  <MTextBox type="DSLIName" name="DSLIName" id="DSLIName" className="form-control" placeholder="Name" onWrite={(event) => {this.name = event.target.value}}/>
          			</div>
          			<div className="modal-footer">
          				<button type="button" className="btn btn-default" data-dismiss="modal" onClick = {() => {
                    this.newDSLI = false
                    store.dispatch(actions.refresh())
                  }}>Cancel</button>
                  <MButton type="button" className="btn btn-custom" label="Create" onClick = {() => {
                    store.dispatch(actions.newDSLI({name:this.name, code:"Insert your DSL code here!"})).then(() => (store.dispatch(actions.getDSLIList())))
                    this.newDSLI = false
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

Dashboard.contextTypes = {
  store : React.PropTypes.object
}

export default Dashboard
