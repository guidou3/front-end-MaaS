/*
* Name : MainPage.js
* Location : ./modules/containers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-14   Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
// modules/Home.js
import React from 'react'
import Components from '../components'
const {MLink, MError} = Components

export default React.createClass({
  render() {
    return (
      <div id="home-sec">
        <div className="container" id="home" >
            <div className="row text-center">
                <div className="col-md-12">
                    <span className="head-main">TRY THIS SERVICE!</span>
                    <h2 className="head-sub-main">MaaS lets you access your MongoDB&#39;s databases with simple commands!</h2>
                    <MLink to="/signIn" className="btn btn-danger btn-lg head-btn-one">SIGN UP YOUR COMPANY NOW !</MLink>
                </div>
            </div>
        </div>
      </div>
	   )
  }
})
