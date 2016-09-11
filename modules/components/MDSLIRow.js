/*
* Name : MDSLIRow.js
* Location : ./modules/components/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-05     Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import MButton from './MButton'
import MLink from './MLink'
import { Button, Glyphicon} from 'react-bootstrap'

class MDSLIRow extends Component {
  constructor(props) {
    super(props)
  }
  clone() {
    const { store } = this.context
    let dsli = store.getState().currentDSLI
    let n = Object.assign({}, dsli, {name:"Clone of "+ dsli.name, permits:0})
		store.dispatch(actions.newDSLI(n)).then(() => (store.dispatch(actions.getDSLIList())))
  }
  render() {
    const { store } = this.context
    let admin = (<td></td>)
    let edit = false
    let del = false
    let clone = false

    if(this.props.data.permits < 3 && this.props.data.permits != 0 && store.getState().loggedUser.accessLevel < 2)
      del = true
    if(this.props.data.permits < 2 && this.props.data.permits != 0 && store.getState().loggedUser.accessLevel < 2 ){
      clone = true
      edit = true
    }
    var date = new Date(this.props.data.lastModifiedDate)

    let type =""
    if(this.props.data.permits != 0) type = "Public"
    else type = "Private"
    return (
      <tr>
        <td>
          <MLink to={"/execdsli?ID="+this.props.data.id}>
            {this.props.data.name}
          </MLink>
        </td>
        <td>{date.toUTCString()}</td>
        <td>{type}</td>
        <td>{this.props.data.accountId}</td>
        <td>
          <Button bsSize="xs" bsStyle="primary" disabled={edit} onClick = {() => {
            store.dispatch(actions.getDSLI(this.props.data.id))
              .then(() => (store.dispatch(actions.getDatabase())))
              .then(() => (store.dispatch(actions.redirect("/editdsli"))))
          }}>
            <Glyphicon glyph="pencil"/>
          </Button>
        </td>
        <td>
         <Button bsSize="xs" bsStyle="primary" disabled={clone} onClick = {() => {
           store.dispatch(actions.getDSLI(this.props.data.id))
           .then(() => (this.clone()))
         }}>
           <Glyphicon glyph="share-alt"/>
         </Button>
       </td>
        <td>
         <Button bsSize="xs" bsStyle="danger" disabled={del} onClick = {() => {
           store.dispatch(actions.deleteDSLI(this.props.data.id)).then(() => (store.dispatch(actions.getDSLIList())))
         }}>
           <Glyphicon glyph="trash"/>
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
