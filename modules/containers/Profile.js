/*
* Name : Profile.js
* Location : ./modules/containers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-16   Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import MButton from '../components/MButton'
import MTextBox from '../components/MTextBox'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
  }

  render() {
    const { store } = this.context
    this.image = store.getState().loggedUser.image
    if(this.image == undefined) {
      this.image = 'http://i.stack.imgur.com/HQwHI.jpg'
    }
    return (

  	  <div>
        <h2>Profile</h2>
        <p>{store.getState().loggedUser.accout}</p>

        <div>
          <img src={this.image} alt="Profile image" className="img-responsive"/>
        </div>

        <MButton label = "Change image" onClick = {() => {
          store.dispatch(actions.refresh())
        }}/>
        <MButton label = "Change password" onClick = {() => {
          store.dispatch(actions.redirect('/profile/changepwd'))
        }}/>
      </div>
  	)
  }
}

Profile.contextTypes = {
  store : React.PropTypes.object
}

export default Profile
