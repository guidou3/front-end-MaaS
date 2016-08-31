import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import MButton from './MButton'
import MLink from './MLink'
import { Button, DropdownButton, MenuItem, Glyphicon} from 'react-bootstrap'

class MAdminDSLIRow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { store } = this.context
    let access = this.props.data.permits

    let combobox =
                  <td>
                   <div className="form-group">
                    <select className="form-control" defaultValue={access} onChange = {(event) => {
                       store.dispatch(actions.changeDSLIPermits(this.props.data, event.target.value)).then(() => (store.dispatch(actions.getDSLIList())))}}>
                     <option value='1'>{access==1 ? "Executable \u2713" : "Executable"}</option>
                     <option value='2'>{access==2 ? "Readable \u2713" : "Readable"}</option>
                     <option value='3'>{access==3 ? "Modificable \u2713" : "Modificable"}</option>
                   </select>
                  </div>
                </td>
    if(access == 0)
      combobox = <td><div className="form-group">Private &#10003;</div></td>
    if(!this.props.showPermits)
      combobox = null
    return (
      <tr>
        <td>{this.props.data.id}</td>
        <td>
          <MLink to="/execdsli" onClick = {() => {
            store.dispatch(actions.getDSLI(this.props.data.id))
          }}>
            {this.props.data.name}
          </MLink>
        </td>
        <td>{this.props.data.lastModifiedDate}</td>
        <td>{this.props.data.accountId}</td>
        {combobox}
        <td>
          <Button bsSize="xs" bsStyle="primary" onClick = {() => {
            store.dispatch(actions.getDSLI(this.props.data.id)).then(() => (store.dispatch(actions.redirect("/editdsli"))))
          }}>
            <Glyphicon glyph="pencil"/>
          </Button>
        </td>
        <td>
          <Button bsSize="xs" bsStyle="primary"  onClick = {() => {
            store.dispatch(actions.getDSLI(this.props.data.id)).then(() => (store.dispatch(actions.cloneDSLI(store.getState().currentDSLI,3))))
          }}>
            <Glyphicon glyph="globe"/>
          </Button>
        </td>
        <td>
          <Button bsSize="xs" bsStyle="danger"  onClick = {() => {
            store.dispatch(actions.deleteDSLI(this.props.data.id)).then(() => (store.dispatch(actions.getDSLIList())))
          }}>
            <Glyphicon glyph="trash"/>
          </Button>
        </td>
      </tr>
    )
  }
}

MAdminDSLIRow.contextTypes = {
  store : React.PropTypes.object
}

export default MAdminDSLIRow
