/*
* Name : HomeDeveloper.js
* Location : ./modules/containers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-08   Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MTextArea, MButton, MError} = Components
import {ButtonToolbar, Button, Glyphicon, FieldGroup} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

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
    padding           : '5%',
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

class HomeDeveloper extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.modal = false
  }

  goto(){
    const {store} = this.context
    if(!store.getState().status.error)
      store.dispatch(actions.getDSLIList()).then(() => (store.dispatch(actions.redirect('/home'))))
  }

  render() {
    const {store} = this.context

    if(store.getState().status.result == "error") {
        this.warn = <MError/>
      }
    else {
        this.warn = ""
    }

    return (
	  <div className="home developer">
        <h1 className="top title">Welcome Super Admin</h1>
          <Button bsStyle="primary" onClick = {() => {
            this.modal = true
            store.dispatch(actions.refresh())
          }}>
            <img src="../Immagini/Impersonate.png" alt="Impersonate button" className="Impersonate"/>
          </Button>

      {this.warn}
      <Modal isOpen= {this.modal} style={customStyles} transparent={true}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" onClick = {() => {
                  this.modal = false
                  store.dispatch(actions.refresh())
                }}>
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">Close</span>
                </button>
                <h4 className="modal-title">Impersonate</h4>
              </div>
              <div className="modal-body">
                <p>Insert the mail of the user to impersonate</p>
                <MTextBox type="email" name="email" id="email" className="form-control" placeholder="somebody@example.com" onWrite={(event) => {this.mail = event.target.value}}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick = {() => {
                  this.modal = false
                  store.dispatch(actions.refresh())
                }}>Cancel</button>
                <MButton type="button" className="btn btn-custom" label="Impersonate" onClick = {() => {
                  store.dispatch(actions.embodyUser(this.mail))
                    .then(() => (this.goto()))

                  this.modal = false
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

HomeDeveloper.contextTypes = {
  store : React.PropTypes.object
}

export default HomeDeveloper
