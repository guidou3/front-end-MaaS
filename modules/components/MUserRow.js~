import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import MButton from './MButton'

class MUserRow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { store } = this.context
    let combobox = <td>
                     <select name="example" defaultValue={this.props.user.dutyId} onChange = {(event) => {
                        store.dispatch(actions.setAccessLevel({id:this.props.user.email, level:event.target.value}))}}>
                      <option value='1'>{this.props.user.dutyId==1 ? "Member ♥" : "Member"}</option>
                      <option value='2'>{this.props.user.dutyId==2 ? "Admin ♥" : "Admin"}</option>
                    </select>
                  </td>

    if(this.props.user.dutyId > 2)
        combobox = <td>Owner</td>

    return (
      <tr>
        <td>{this.props.user.email}</td>
        {combobox}
        <td>Profilo</td>
        <td>
          <p data-placement="top" data-toggle="tooltip" title="Delete">
            <button className="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" onClick = {() => {
              store.dispatch(actions.deleteUser(this.props.data.email))
              store.dispatch(actions.getUserList())
            }}>
              <span className="glyphicon glyphicon-trash"/>
            </button>
          </p>
        </td>
      </tr>
    )
  }
}

MUserRow.contextTypes = {
  store : React.PropTypes.object
}

export default MUserRow
