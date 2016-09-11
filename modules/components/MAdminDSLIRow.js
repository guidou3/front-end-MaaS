/*
* Name : MAdminDSLIRow.js
* Location : ./modules/Components/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-07-28     Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import MButton from './MButton'
import MLink from './MLink'
import { Button, DropdownButton, MenuItem, Glyphicon} from 'react-bootstrap'
import Modal from 'react-modal'
import MTextBox from './MTextBox'


const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    //backgroundColor   : 'rgba(0, 0, 0, 0.5)'
  },
  content : {
    position          : 'absolute',
    top               : '50%',
    left              : '50%',
    right             : 'none',
    bottom            : 'none',
    marginRight       : 'none',
    //background        : 'rgba(0, 0, 0, 0.5)',
    outline           : 'none',
    borderRadius      : 'none',
    transform         : 'translate(-50%, -50%)',
    border            : 'none',
    padding           : 'none'
  }
};

class MAdminDSLIRow extends Component {
  constructor(props) {
    super(props)
    this.dialog = false
  }
  clone() {
    const { store } = this.context
    let dsli = store.getState().currentDSLI
    let n = Object.assign({}, dsli, {name:"Clone of "+ dsli.name, permits: 3})
		store.dispatch(actions.newDSLI(n)).then(() => (store.dispatch(actions.getDSLIList())))
    //store.dispatch(actions.cloneDSLI(store.getState().currentDSLI,3))
    //.then(() => (store.dispatch(actions.getDSLIList())))
  }

  render() {
    const { store } = this.context
    let access = this.props.data.permits
    let send =
      <td>
        <Button bsSize="xs" bsStyle="primary" onClick = {() => {
          this.dialog = true
          store.dispatch(actions.refresh())
        }}>
          <Glyphicon glyph="envelope"/>
        </Button>
      </td>
    let combobox =
                  <td>
                   <div className="form-group">
                    <select className="form-control input-sm" defaultValue={access} onChange = {(event) => {
                       store.dispatch(actions.changeDSLIPermits(this.props.data, event.target.value)).then(() => (store.dispatch(actions.getDSLIList())))}}>
                     <option value='1'>{access==1 ? "Executable \u2713" : "Executable"}</option>
                     <option value='2'>{access==2 ? "Readable \u2713" : "Readable"}</option>
                     <option value='3'>{access==3 ? "Modificable \u2713" : "Modificable"}</option>
                   </select>
                  </div>
                </td>
    if(access == 0)
      combobox = <td><div className="form-group">Private &#10003;</div></td>
    if(!this.props.showPermits){
      combobox = null
      send = null
    }
    var date = new Date(this.props.data.lastModifiedDate)

    return (
      <tr>
        <td>
          <MLink to={"/execdsli?ID="+this.props.data.id}>
            {this.props.data.name}
          </MLink>
        </td>
        <td>{this.props.data.id}</td>
        <td>{date.toUTCString()}</td>
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
            store.dispatch(actions.getDSLI(this.props.data.id))
            .then(() => (this.clone()))
          }}>
            <Glyphicon glyph="globe"/>
          </Button>
        </td>
        {send}
        <td>
          <Button bsSize="xs" bsStyle="danger"  onClick = {() => {
            store.dispatch(actions.deleteDSLI(this.props.data.id)).then(() => (store.dispatch(actions.getDSLIList())))
          }}>
            <Glyphicon glyph="trash"/>
          </Button>
        </td>
        <Modal isOpen= {this.dialog} style={customStyles} transparent={true}>
          	<div className="modal-dialog modal-sm">
          		<div className="modal-content">
          			<div className="modal-header">
          				<button type="button" className="close" data-dismiss="modal" onClick = {() => {
                    this.dialog = false
                    store.dispatch(actions.refresh())
                  }}>
          					<span aria-hidden="true">×</span>
          					<span className="sr-only">Close</span>
          				</button>
          				<h4 className="modal-title">Invite guest</h4>
          			</div>
          			<div className="modal-body">
          				<p>Insert the mail of the user to invite</p>
                  <MTextBox type="email" name="email" id="email" className="form-control" placeholder="example@example.com" onWrite={(event) => {this.user = event.target.value}}/>
          			</div>
          			<div className="modal-footer">
          				<button type="button" className="btn btn-default" data-dismiss="modal" onClick = {() => {
                    this.dialog = false
                    store.dispatch(actions.refresh())
                  }}>Cancel</button>
                  <MButton type="button" className="btn btn-custom" label="Send Invite" onClick = {() => {
                    store.dispatch(actions.sendDSLI(this.props.data.id, this.user))
                    this.dialog = false
                    store.dispatch(actions.refresh())
                  }}/>
          			</div>
          		</div>
          	</div>
        </Modal>
      </tr>
    )
  }
}

MAdminDSLIRow.contextTypes = {
  store : React.PropTypes.object
}

export default MAdminDSLIRow
