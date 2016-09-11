/*
* Name : MError.js
* Location : ./modules/components/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-07     Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import {Alert} from 'react-bootstrap';

class MError extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { store } = this.context
    const error = store.getState().status.error;
    let text =""
    if(error == 404) text = "Error 404: Element not found."
    else if(error == 401) text = "Error 401: Unauthorized."
    else if(error == 422) text = "Error 422: Error in registering the owner."
    else text= "Error " + error
    return (
      <Alert bsStyle="danger">
        <p>{text}</p>
      </Alert>
    )
  }
}

MError.contextTypes = {
  store : React.PropTypes.object
}

export default MError
