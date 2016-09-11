/*
* Name : RecoverPassword.js
* Location : ./modules/containers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-05   Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import Components from '../components'
const {MTextBox,  MError} = Components
import * as actions from '../actions/RootAction'
import { routerMiddleware, push } from 'react-router-redux'

class RePwd extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
  }

  render() {
    const { store } = this.context

    if(store.getState().status.result == "error") {
        this.warn = <MError/>
      }
    else {
        this.warn = ""
    }

    return (
  	  <div>
        <h2>Set new password</h2>
        Nuova Password <MTextBox
          boxType="password"
          onWrite={(event) => {
            this.p1 = event.target.value
          }}
        />
        Ripeti Password <MTextBox
          boxType="password"
          onWrite={(event) => {
            this.p2 = event.target.value
          }}
        />
        {this.warn}

        <button
          type = "button"
          onClick = {() => {
            if(this.p1 == this.p2)
              store.dispatch(actions.changePassword(this.p1, this.props.location.query.pwd)).then(() => (store.dispatch(actions.redirect('/'))))
            else{
              this.warn = "Le password non coincidono!";
              store.dispatch(actions.refresh())
            }
          }}>
          CHANGE PASSWORD
        </button>
      </div>
  	)
  }
}

RePwd.contextTypes = {
  store : React.PropTypes.object
}

export default RePwd
