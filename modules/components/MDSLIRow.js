import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import MButton from './MButton'
import MLink from './MLink'

class MDSLIRow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { store } = this.context
    let admin = (<td></td>)
    return (
      <tr>
        <td>
          <MLink to="/execdsli" onClick = {() => {
            store.dispatch(actions.setDSLI(this.props.data))
          }}>
            {this.props.data.name}
          </MLink>
        </td>
        <td>{this.props.data.lastModifiedDate}</td>
        <td>{this.props.data.id}</td>
        <td>
          <p data-placement="top" data-toggle="tooltip" title="Edit">
            <button className="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" onClick = {() => {
              store.dispatch(actions.setDSLI(this.props.data))
              store.dispatch(actions.redirect("/editdsli"))
            }}>
              <span className="glyphicon glyphicon-pencil"/>
            </button>
          </p>
        </td>
        <td>
          <p data-placement="top" data-toggle="tooltip" title="Delete">
            <button className="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" onClick = {() => {
              store.dispatch(actions.deleteDSLI(this.props.data.id))
              store.dispatch(actions.getDSLIList())
            }}>
              <span className="glyphicon glyphicon-trash"/>
            </button>
          </p>
        </td>
        <td>
          <p data-placement="top" data-toggle="tooltip" title="Clone">
            <button className="btn btn-primary btn-xs" data-title="Clone" data-toggle="modal" data-target="#share" onClick = {() => {
              store.dispatch(actions.cloneDSLI(this.props.data))
              store.dispatch(actions.getDSLIList())
            }}>
              <span className="glyphicon glyphicon-share"/>
            </button>
          </p>
        </td>
      </tr>
    )
  }
}

MDSLIRow.contextTypes = {
  store : React.PropTypes.object
}

export default MDSLIRow
