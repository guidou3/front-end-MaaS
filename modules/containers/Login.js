import React from 'react'
import MTextBox from '../components/MTextBox'

export default React.createClass({
  render() {
    return (
	  <div>
      <h2>Login</h2>
      <MTextBox/>
  		<div>
  		    <label htmlFor="pass">Form:</label>
  		    <input type="password" id="pass" />
  		</div>
    </div>
	)
  }
})
