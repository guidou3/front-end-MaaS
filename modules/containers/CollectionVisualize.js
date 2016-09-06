import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MTextArea, MButton} = Components

class CollectionVisualize extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.name = "SampleDSLI"
  }

  render() {
    const { store } = this.context
    let dsli = store.getState().currentDSLI
    //let data = store.getState().currentDSLI.result
    let data =
      {
        "properties":
        [
          {"name": "id"},
          {"name": "name"},
          {"name": "type"},
        ],
        "data":
        [
          {
            "id":"fuoaefhapiw",
            "name":"primo",
            "type":"document"
          },
          {
            "id":"faoifefi",
            "name":"secondo",
            "type":"document"
          },
          {
            "id":"yegfseheih",
            "name":"terzo",
            "type":"document"
          }
        ]
      }

      return (
    	  <div>
          <div className = "DSLITitle">
            <h2>
              {dsli.name}
            </h2>
          </div>
          <div className="table-responsive">
            <table id="mytable" className="table table-bordred table-striped">
                <tr>
                  <th>{data.properties[0].name}</th>
                  <th>{data.properties[1].name}</th>
                  <th>{data.properties[2].name}</th>
                </tr>
                <tr>
                  <td>{data.data[0][data.properties[0].name]}</td>
                  <td>{data.data[0][data.properties[1].name]}</td>
                  <td>{data.data[0][data.properties[2].name]}</td>
                </tr>
                <tr>
                  <td>{data.data[1][data.properties[0].name]}</td>
                  <td>{data.data[1][data.properties[1].name]}</td>
                  <td>{data.data[1][data.properties[2].name]}</td>
                </tr>
                <tr>
                  <td>{data.data[2][data.properties[0].name]}</td>
                  <td>{data.data[2][data.properties[1].name]}</td>
                  <td>{data.data[2][data.properties[2].name]}</td>
                </tr>
            </table>
          </div>
        </div>
    	)
  }
}

CollectionVisualize.contextTypes = {
  store : React.PropTypes.object
}

export default CollectionVisualize
