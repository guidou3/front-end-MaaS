import React from 'react'

export default React.createClass({
  render() {
    return (
	  <div>
        <h2>Login</h2>

		<div>
		    <label htmlFor="email">E-mail:</label>
		    <input type="text" id="email" />
		</div>
		<div>
		    <label htmlFor="pass">Password:</label>
		    <input type="password" id="pass" />
		</div>
      </div>
	)
  }
})
