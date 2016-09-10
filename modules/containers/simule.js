/*
* Name : Simule.js
* Location : ./modules/containers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-15   Roberto D'Amico
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MTextArea, MButton} = Components

class Simule extends Component {
  constructor(props) {
    super(props)
    this.warn = ""
    this.name = "SampleDSLI"
  }

  render() {
    const { store } = this.context
    let dsli = store.getState().currentDSLI

    if(dsli.id === "57bc9bc4e87d4a00111f236e") {
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
                  <th>Nome azienda</th>
                  <td>Balocchi In Scatola spa</td>
                </tr>
                <tr>
                  <th>Partita IVA</th>
                  <td>123893014724981000</td>
                </tr>
                <tr>
                  <th>Anno di Fondazione</th>
                  <td>2004</td>
                </tr>
                <tr>
                  <th>Nome Proprietario</th>
                  <td>Renzo Luccarelli</td>
                </tr>
            </table>
          </div>
        </div>
    	)
    }
    else if(dsli.id === "57bc7cc96b6d6900110e044f") {
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
                  <th>Persona età ˂ 30</th>
                  <td>Gino Paoli</td>
                </tr>
            </table>
          </div>
        </div>
    	)
    }
    else if(dsli.id === "57bd67a24e6bf700112949c4") {
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
                  <th>Numero di pezzi in magazzino</th>
                  <td>21</td>
                </tr>
            </table>
          </div>
        </div>
    	)
    }
    else if(dsli.id === "57bc690e00876c00112b9a12") {
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
                  <th>Salone auto Toyota</th>
                  <td>http://www.satoyota.it</td>
                </tr>
            </table>
          </div>
        </div>
    	)
    }
    else if(dsli.id === "57bc60d15ec40a00115d2891") {
      return (
    	  <div>
          <div className = "DSLITitle">
            <h2>
              {dsli.name}
            </h2>
          </div>
          <div className="table-responsive">
            <table id="mytable" className="table table-bordred table-striped">
              <thead>
                <tr>
                  <th>Nome Persona</th>
                  <th>Età Persona</th>
                  <th>Nome Azienda</th>
                  </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mario Rossi</td>
                  <td>34</td>
                  <td>Panificio Roberti s.p.a.</td>
                </tr>
                <tr>
                  <td>Gianluigi Bianchi</td>
                  <td>45</td>
                  <td>Acque Santi s.n.c.</td>
                </tr>
                <tr>
                  <td>Mario Super</td>
                  <td>53</td>
                  <td>DDGames s.r.l.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    	)
    }
    else {
      return (
    	  <div>
          <div className = "DSLITitle">
            <h2>
              {dsli.name}
            </h2>
          </div>
          <h1>Error</h1>
        </div>
      )
    }
  }
}

Simule.contextTypes = {
  store : React.PropTypes.object
}

export default Simule
