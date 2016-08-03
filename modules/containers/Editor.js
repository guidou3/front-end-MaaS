import React, { Component, PropTypes } from 'react'
import MTextBox from '../components/MTextBox'
import * as actions from '../actions/RootAction'

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
          <button
              type = "button"
              onClick = {() => {
                this.dialog = true
                store.dispatch(actions.refresh())
            }}>
            RENAME
          </button>
        </div>

        <textarea rows="20" cols="20">
        At w3schools.com you will learn how to make a website. We offer free tutorials in all web development technologies.
        </textarea>

        <div>
          <button
            type = "button"
            onClick = {() => {
              store.dispatch(actions.redirect('/home'))
          }}>
            SAVE
          </button>
          <button
            type = "button"
            onClick = {() => {
              store.dispatch(actions.redirect('/home'))
          }}>
            DELETE
          </button>
          <button
            type = "button"
            onClick = {() => {
              store.dispatch(actions.redirect('/home'))
          }}>
            CLONE
          </button>
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
          <button
            type = "button"
            onClick = {() => {
              if(this.tempname)
                this.name = this.tempname
              this.dialog = false
              store.dispatch(actions.refresh())
              //store.dispatch(actions.redirect('/home'))
          }}>
          OK
          </button>
          <button
            type = "button"
            onClick = {() => {
              this.dialog = false
              store.dispatch(actions.refresh())
              //store.dispatch(actions.redirect('/home'))
          }}>
          CANCEL
          </button>
        </Modal>

      </div>
  	)
  }
}

Editor.contextTypes = {
  store : React.PropTypes.object
}

export default Editor
