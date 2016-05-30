import React from 'react'

export default React.createClass({
  render() {
    return (
	  <div>
        <h2>Login</h2>

		<div>
		    <label for="email">E-mail:</label>
		    <input type="text" id="email" />
		</div>
		<div>
		    <label for="pass">Password:</label>
		    <input type="password" id="pass" />
		</div>
      </div>
	)
  }
})
