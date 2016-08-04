import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MButton} = Components
import Modal from 'react-modal'

class Editor extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.name = "SampleDSLI"
    this.dialog = false
  }

  render() {
    const { store } = this.context
    return (
  	  <div>
        <div>
          <h2>Edit {this.name}</h2>
          <MButton label = "RENAME"
              onClick = {() => {
                this.dialog = true
                store.dispatch(actions.refresh())
          }}/>
        </div>

        <textarea rows="20" cols="20">
        At w3schools.com you will learn how to make a website. We offer free tutorials in all web development technologies.
        </textarea>

        <div>
          <MButton label = "SAVE"
            onClick = {() => {
              store.dispatch(actions.redirect('/home'))
          }}/>
          <MButton label = "DELETE"
            onClick = {() => {
              store.dispatch(actions.redirect('/home'))
          }}/>
          <MButton label = "CLONE"
            onClick = {() => {
              store.dispatch(actions.cloneDSLI('/home'))
          }}/>
        </div>

        {this.warn}

        <Modal isOpen= {this.dialog}>
          <h2>Insert new Name for this DSLI</h2>
          NEW NAME <MTextBox
            boxType="text"
            onWrite={(event) => {
              this.tempname = event.target.value
            }}
          />
          <MButton label = "OK"
            onClick = {() => {
              if(this.tempname)
                this.name = this.tempname
              this.dialog = false
              store.dispatch(actions.refresh())
              //store.dispatch(actions.redirect('/home'))
          }}/>
          <MButton label = "CANCEL"
            onClick = {() => {
              this.dialog = false
              store.dispatch(actions.refresh())
              //store.dispatch(actions.redirect('/home'))
          }}/>
        </Modal>

      </div>
  	)
  }
}

Editor.contextTypes = {
  store : React.PropTypes.object
}

export default Editor
