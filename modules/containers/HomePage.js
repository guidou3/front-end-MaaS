import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MButton} = Components

class Dashboard extends Component {

  render() {
    const {store} = this.context
    return (
	  <div>
        <h2>Welcome to Your Dashboard</h2>
        <MButton label = "CREATE DSLI"
          onClick = {() => {
            store.dispatch(actions.redirect('/newdsli'))
        }}/>
        <MButton label = "EDIT DSLI"
          onClick = {() => {
            store.dispatch(actions.redirect('/editdsli'))
        }}/>
    </div>
	)
  }
}

Dashboard.contextTypes = {
  store : React.PropTypes.object
}

export default Dashboard
