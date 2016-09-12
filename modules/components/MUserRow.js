/*
* Name : MError.js
* Location : ./modules/components/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-12     Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import { Button, Glyphicon} from 'react-bootstrap'

class MUserRow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { store } = this.context
    let combobox =
      <td>
       <select name="example" className="input-sm form-control" defaultValue={this.props.user.dutyId} onChange = {(event) => {
          store.dispatch(actions.setAccessLevel({id:this.props.user.email, level:event.target.value})).then(() => (store.dispatch(actions.getUserList())))}}>
        <option value='1'>{this.props.user.dutyId==1 ? "Member \u2713" : "Member"}</option>
        <option value='2'>{this.props.user.dutyId==2 ? "Admin \u2713" : "Admin"}</option>
       </select>
     </td>
    let del = false
    if(this.props.user.dutyId > 2) {
        combobox = <td>Owner</td>
        del = true
      }

    return (
      <tr>
        <td>{this.props.user.email}</td>
        {combobox}
        <td>
          <Button bsSize="xs" bsStyle="danger" disabled={del} onClick = {() => {
            store.dispatch(actions.deleteUser(this.props.user.email)).then(() => (store.dispatch(actions.getUserList())))
          }} >
            <Glyphicon glyph="trash"/>
          </Button>
        </td>
      </tr>
    )
  }
}

MUserRow.contextTypes = {
  store : React.PropTypes.object
}

export default MUserRow
