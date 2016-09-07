import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import { Button, Glyphicon} from 'react-bootstrap'

class MDataRow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { store } = this.context
    return (
      <tr>
        <td className="col1">{this.props.data.tag}</td>
        <td className="col2">{this.props.data.id}</td>
        <td className="col3">
          <Button bsSize="xs" bsStyle="danger"  onClick = {() => {
            store.dispatch(actions.deleteData(this.props.data.id)).then(() => (store.dispatch(actions.getDatabase())))
          }}>
            <Glyphicon glyph="trash"/>
          </Button>
        </td>
      </tr>
    )
  }
}

MDataRow.contextTypes = {
  store : React.PropTypes.object
}

export default MDataRow
