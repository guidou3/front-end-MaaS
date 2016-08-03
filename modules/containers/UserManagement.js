import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import MTextBox from '../components/MTextBox'
import NavLink from '../components/NavLink'
import Modal from 'react-modal'

class MnUser extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.dialog = false
  }

  render() {
    const { store } = this.context
    return (
  	  <div>
        <h2>User Managment</h2>
        <table>
        <tbody>
          <tr>
            <td>{store.getState().profile.email}</td>
            <td>{store.getState().profile.name}</td>
            <td><button type = "button">X</button></td>
            <td><select name="example">
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select> </td>
          </tr>
          <tr>
            <td>{store.getState().profile.email}</td>
            <td>{store.getState().profile.name}</td>
            <td><button type = "button">X</button></td>
            <td><select name="example">
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select> </td>
          </tr>
          <tr>
            <td>{store.getState().profile.email}</td>
            <td>{store.getState().profile.name}</td>
            <td><button type = "button">X</button></td>
            <td><select name="example">
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select> </td>
          </tr>
          <tr>
            <td>{store.getState().profile.email}</td>
            <td>{store.getState().profile.name}</td>
            <td><button type = "button">X</button></td>
            <td><select name="example">
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select> </td>
          </tr>
        </tbody>
        </table>
        EMAIL <MTextBox
          boxType="text"
          onWrite={(event) => {
            this.user = event.target.value
          }}
        />
        <button
          type = "button"
          onClick = {() => {
            this.dialog = true
            store.dispatch(actions.refresh())
            //store.dispatch(actions.redirect('/home'))
        }}>
        SEND INVITE
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

MnUser.contextTypes = {
  store : React.PropTypes.object
}

export default MnUser
