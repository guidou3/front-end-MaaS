// modules/Home.js
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'

class Dashboard extends Component {

  render() {
    const {store} = this.context
    return (
	  <div>
        <h2>Welcome to Your Dashboard</h2>
        <button
          type = "button"
          onClick = {() => {
            store.dispatch(actions.redirect('/newdsli'))
          }}>
          CREATE DSLI
        </button>
        <button
          type = "button"
          onClick = {() => {
            store.dispatch(actions.redirect('/editdsli'))
          }}>
          EDIT DSLI
        </button>
    </div>
	)
  }
}

Dashboard.contextTypes = {
  store : React.PropTypes.object
}

export default Dashboard
