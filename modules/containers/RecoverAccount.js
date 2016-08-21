import React, { Component, PropTypes } from 'react'
import MTextBox from '../components/MTextBox'
import * as actions from '../actions/RootAction'

class ReAcc extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
  }

  render() {
    const { store } = this.context
    return (
      <Modal isOpen= {this.dialog} style={customStyles}>
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
        				<h4 className="modal-title">Recovery password</h4>
        			</div>
        			<div className="modal-body">
        				<p>Type your email account</p>
                <MTextBox type="email" name="recovery-email" id="recovery-email" className="form-control" placeholder="somebody@example.com" onWrite={(event) => {this.mail = event.target.value}}/>
        			</div>
        			<div className="modal-footer">
        				<button type="button" className="btn btn-default" data-dismiss="modal" onClick = {() => {
                  this.dialog = false
                }}>Cancel</button>
                <MButton type="button" className="btn btn-custom" value="Recovery" onClick = {() => {
                  store.dispatch(actions.login({mail:this.mail, pwd:this.pwd}))
                  this.dialog = false
                  store.dispatch(actions.refresh())
                }}/>
        			</div>
        		</div>
        	</div>
      </Modal>
  	)
  }
}

ReAcc.contextTypes = {
  store : React.PropTypes.object
}

export default ReAcc
