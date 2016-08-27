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
          <div className="form-group">
            <select className="form-control" defaultValue={access} onChange = {(event) => {
               store.dispatch(actions.changeDSLIPermits(this.props.data, event.target.value).then(() => (store.dispatch(actions.getDSLIList()))))}}>
             <option value='0'>{access==0 ? "Private \u2713" : "Private"}</option>
             <option value='1'>{access==1 ? "Executable \u2713" : "Executable"}</option>
             <option value='2'>{access==2 ? "Readable \u2713" : "Readable"}</option>
             <option value='3'>{access==3 ? "Modificable \u2713" : "Modificable"}</option>
           </select>
          </div>
        </td>
        <td>
          <Button bsSize="xs" bsStyle="primary" onClick = {() => {
            store.dispatch(actions.setDSLI(this.props.data))
            store.dispatch(actions.redirect("/editdsli"))
          }}>
            <Glyphicon glyph="pencil"/>
          </Button>
        </td>
        <td>
          <Button bsSize="xs" bsStyle="primary"  onClick = {() => {
            store.dispatch(actions.cloneDSLI(this.props.data, 3))
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
