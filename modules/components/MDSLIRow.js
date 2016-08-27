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
    let edit = (<td>
                  <Button bsSize="xs" bsStyle="primary"  onClick = {() => {
                    store.dispatch(actions.getDSLI(this.props.data.id)).then(() => (store.dispatch(actions.redirect("/editdsli"))))
                  }}>
                    <Glyphicon glyph="pencil"/>
                  </Button>
                </td>)
    let del = (<td>
                 <Button bsSize="xs" bsStyle="danger"  onClick = {() => {
                   store.dispatch(actions.deleteDSLI(this.props.data.id)).then(() => (store.dispatch(actions.getDSLIList())))
                 }}>
                   <Glyphicon glyph="trash"/>
                 </Button>
               </td>)
    let clone = (<td>
                   <Button bsSize="xs" bsStyle="primary"  onClick = {() => {
                     store.dispatch(actions.getDSLI(this.props.data.id)).then(() => (store.dispatch(actions.cloneDSLI(store.getState().currentDSLI))))
                   }}>
                     <Glyphicon glyph="share"/>
                   </Button>
                 </td>)

    if(this.props.data.permits < 3 && this.props.data.permits != 0 && store.getState().loggedUser.accessLevel < 2)
      del = admin
    if(this.props.data.permits < 2 && this.props.data.permits != 0 && store.getState().loggedUser.accessLevel < 2 ){
      clone = admin
      edit = admin
    }

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
        {edit}
        {clone}
        {del}
      </tr>
    )
  }
}

MDSLIRow.contextTypes = {
  store : React.PropTypes.object
}

export default MDSLIRow
