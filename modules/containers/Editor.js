import React, { Component, PropTypes } from 'react'
import MTextBox from '../components/MTextBox'
import * as actions from '../actions/RootAction'

class Editor extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
  }

  render() {
    const { store } = this.context
    return (
  	  <div>
        <h2>Editor DSLI</h2>
        <textarea rows="20" cols="20">
          At w3schools.com you will learn how to make a website. We offer free tutorials in all web development technologies.
        </textarea>
        {this.warn}

        <button
          type = "button"
          onClick = {() => {
            store.dispatch(actions.redirect('/home'))
          }}>
          CREATE
        </button>
      </div>
  	)
  }
}

Editor.contextTypes = {
  store : React.PropTypes.object
}

export default Editor
