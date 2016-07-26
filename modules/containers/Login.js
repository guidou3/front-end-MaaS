import React from 'react'
import Form from '../components/Form'

export default React.createClass({
  render() {
    return (
	  <div>
      <h2>Login</h2>
      <Form/>
  		<div>
  		    <label htmlFor="pass">Form:</label>
  		    <input type="password" id="pass" />
  		</div>
    </div>
	)
  }
})
