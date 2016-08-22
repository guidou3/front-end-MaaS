import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import MButton from './MButton'

class MUserRow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { store } = this.context
    let combobox = <td><select name="example">
                     <option value="member" selected={this.props.user.dutyId==1}>Member</option>
                     <option value="admin" selected={this.props.user.dutyId==2}>Admin</option>
                   </select></td>
    if(this.props.user.dutyId > 2)
      combobox = <td>Owner</td>

    return (
      <tr>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.dutyId}</td>
        <td><MButton label = "X"
          onClick = {() => {
            store.dispatch(actions.deleteUser(this.props.user.id))
        }}/></td>
        {combobox}
      </tr>
    )
  }
}

MUserRow.contextTypes = {
  store : React.PropTypes.object
}

export default MUserRow
