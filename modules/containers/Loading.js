import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import PageBuilder from '../services/PageBuilder'

class Loading extends Component {
  constructor(props) {
    super(props)
    this.ready = false;
    this.fetching = false;
  }

  render() {
    const { store } = this.context
    if(!this.fetching){
      this.fetching = true;
      store.dispatch(actions.getDSLI(this.props.location.query.ID))
        .then(() => {
          this.ready = true;
          store.dispatch(actions.refresh());
        });
    }
    if(!this.ready)
      return <PageBuilder dsli = {store.getState().currentDSLI}/>
    else
      return <div>loading...</div>
  }
}

Loading.contextTypes = {
  store : React.PropTypes.object
}

export default Loading
