import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import MButton from './MButton'

class MDataRow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { store } = this.context
    return (
      <tr>
        <td>{this.props.data.tag}</td>
        <td>{this.props.data.id}</td>
        <td>
          <p data-placement="top" data-toggle="tooltip" title="Delete">
            <button className="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" onClick = {() => {
              store.dispatch(actions.deleteData(this.props.data.id)).then(() => (store.dispatch(actions.getDatabase())))
            }}>
              <span className="glyphicon glyphicon-trash"/>
            </button>
          </p>
        </td>
      </tr>
    )
  }
}

MDataRow.contextTypes = {
  store : React.PropTypes.object
}

export default MDataRow
