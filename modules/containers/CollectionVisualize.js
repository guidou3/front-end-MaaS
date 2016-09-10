import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MTextArea, MButton, MError} = Components

class CollectionRow extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { store } = this.context
    let body = []
    let dsli = this.props.dsli
    let header = this.props.header
    for (let i = 0; i < header.length; i++) {
      body[i] = <td>{dsli[header[i].name]}</td>
    }
    return (
      <tr>
        {body}
      </tr>
    )
  }
}

class CollectionVisualize extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.name = "SampleDSLI"
  }

  render() {
    const { store } = this.context

    if(store.getState().status.result == "error") {
        this.warn = <MError/>
      }
    else {
        this.warn = ""
    }


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

      let prop = data.properties
      let header = []
      let n = prop.length
      for (let i = 0; i < n; i++) {
        header[i] = <th>{prop[i].name}</th>
      }
      let body = []
      for (let i = 0; i < data.data.length; i++) {
        body[i] = <CollectionRow header={prop} dsli={data.data[i]}/>
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
                  {header}
                </tr>
                {body}
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
