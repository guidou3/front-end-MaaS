import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import MButton from './MButton'
import MLink from './MLink'
import { Button, Glyphicon} from 'react-bootstrap'

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
          <Button bsSize="xs" bsStyle="primary"  onClick = {() => {
            store.dispatch(actions.setDSLI(this.props.data))
            store.dispatch(actions.redirect("/editdsli"))
          }}>
            <Glyphicon glyph="pencil"/>
          </Button>
        </td>
        <td>
          <Button bsSize="xs" bsStyle="danger"  onClick = {() => {
            store.dispatch(actions.deleteDSLI(this.props.data.id)).then(() => (store.dispatch(actions.getDSLIList())))
          }}>
            <Glyphicon glyph="trash"/>
          </Button>
        </td>
        <td>
          <Button bsSize="xs" bsStyle="primary"  onClick = {() => {
            store.dispatch(actions.cloneDSLI(this.props.data))
          }}>
            <Glyphicon glyph="share"/>
          </Button>
        </td>
      </tr>
    )
  }
}

MDSLIRow.contextTypes = {
  store : React.PropTypes.object
}

export default MDSLIRow
