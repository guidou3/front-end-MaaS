import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'

class List extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { store } = this.context
    const state = store.getState().companies
    const update = () => store.dispatch( actions.getCompanies() )
    return (
      <p>
        Companies
        <button onClick={update}>
          Update
        </button>
          {state}
      </p>
    )
  }
}

List.contextTypes = {
  store : React.PropTypes.object
}

export default List
