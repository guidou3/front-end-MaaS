import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Modal from 'react-modal'
import Components from '../components'
const {MTextBox, MButton, MDataRow} = Components

class MnData extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.dialog = false
  }

  render() {
    const { store } = this.context
    let comp = store.getState().dataList

    let body = []
    let i
    let n = comp.length;
    for (i = 0; i < n; i++) {
      body[i] = <MDataRow data = {comp[i]}/>
    }
    return (
  	  <div>
        <h2>Database Managment</h2>
        <table>
        <tbody>
          {body}
        </tbody>
        </table>
        NAME <MTextBox
          boxType="text"
          onWrite={(event) => {
            this.name = event.target.value
          }}
        />
        URI <MTextBox
          boxType="text"
          onWrite={(event) => {
            this.uri = event.target.value
          }}
        />
        <button
          type = "button"
          onClick = {() => {
            if(this.uri == undefined || this.name == undefined)
              this.warn = "Please compile all data fields";
            else
              store.dispatch(actions.addDatabase({uri: this.uri, tag: this.name}))
            //store.dispatch(actions.redirect('/home'))
        }}>
        ADD DATABASE
        </button>
        <Modal isOpen= {this.dialog}>
          <h2>Do you really want to delete this useless person?</h2>
          <button
            type = "button"
            onClick = {() => {
              this.dialog = false
              store.dispatch(actions.refresh())
              //store.dispatch(actions.redirect('/home'))
          }}>
          YES
          </button>
          <button
            type = "button"
            onClick = {() => {
              this.dialog = false
              store.dispatch(actions.refresh())
              //store.dispatch(actions.redirect('/home'))
          }}>
          NO
          </button>
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
