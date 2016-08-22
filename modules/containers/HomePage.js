import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MButton, MDSLIRow} = Components

class Dashboard extends Component {

  render() {
    const {store} = this.context
    let comp = store.getState().DSLIList

    let body = []
    let i
    let n = comp.length;
    for (i = 0; i < n; i++) {
      body[i] = <MDSLIRow data = {comp[i]} showPermits = {false}/>
    }
    return (
	  <div>
        <h2>Welcome to Your Dashboard</h2>
        <MButton label = "CREATE DSLI"
          onClick = {() => {
            store.dispatch(actions.redirect('/newdsli'))
        }}/>
        <MButton label = "REFRESH"
          onClick = {() => {
            store.dispatch(actions.getDSLIList())
        }}/>
        <div className="table-responsive">
          <table id="mytable" className="table table-bordred table-striped">
            <thead>
              <th>Name</th>
              <th>Last Modified</th>
              <th>Id</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Clone</th>
            </thead>
            <tbody>
              {body}
            </tbody>
          </table>
        </div>

      {this.warn}
    </div>
  	)
  }
}

Dashboard.contextTypes = {
  store : React.PropTypes.object
}

export default Dashboard
