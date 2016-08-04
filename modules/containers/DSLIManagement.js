import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'

class DSLIManagment extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
  }

  render() {
    const { store } = this.context
    return (
  	  <div>
        <h2>DSLI Managment</h2>
        <table>
        <tbody>
          <tr>
            <td>0123456asd3</td>
            <td>Clienti</td>
            <td><button type = "button">X</button></td>
            <td><button type = "button">Permits</button></td>
            <td><button type = "button">Edit</button></td>
          </tr>
          <tr>
            <td>0123456asd2</td>
            <td>Fatture</td>
            <td><button type = "button">X</button></td>
            <td><button type = "button">Permits</button></td>
            <td><button type = "button">Edit</button></td>
          </tr>
          <tr>
            <td>0123456asd1</td>
            <td>Pizze</td>
            <td><button type = "button">X</button></td>
            <td><button type = "button">Permits</button></td>
            <td><button type = "button">Edit</button></td>
          </tr>
          <tr>
            <td>0123456asd0</td>
            <td>Operai</td>
            <td><button type = "button">X</button></td>
            <td><button type = "button">Permits</button></td>
            <td><button type = "button">Edit</button></td>
          </tr>
        </tbody>
        </table>

        {this.warn}
      </div>
  	)
  }
}

DSLIManagment.contextTypes = {
  store : React.PropTypes.object
}

export default DSLIManagment
