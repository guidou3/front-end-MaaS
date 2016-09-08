import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
const {MTextBox, MTextArea, MButton} = Components

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
 this.flag =true;
  }

  render() {
    const { store } = this.context
    let dsli = store.getState().currentDSLI
    //let data = store.getState().currentDSLI.result
    //////DASHBOARD
    /*let JSON = { "DSLType":'dashboard', "rows":[[{"label":"Gigi","type":"cell","dsl":"cell(label:\"nome\", type:\"link\" value:21)"},{"label":"Gigi","type":"cell","dsl":"cell(label:\"nome\", type:\"link\" value:\"ciao\")"}],[{"label":"Gigi","type":"cell","dsl":"cell(label:\"nome\", type:\"link\" value:43)"},{"label":"Gigi","type":"cell","dsl":"cell(label:\"nome\", type:\"link\" value:\"ciao1\")"}]]}
    if(JSON.properties.DSLType == "dashboard"){
      let data = JSON.data;
      let x = [];
      let row = [];
      for(let j=0; j<data.length; j++){
        for(let i=0; i<data[j].length; i++){
          //lancio la dsl al PageBuilder
          //let x=new PageBuilder(data[j][i].dsl);
          //inserisco il JSON ritorno del pagebuilder nel visualize apposito
          //inserisco il dato ritornato nel valore
          x[i]= <th>{data[i][j].label}<td>{/*valore}</td>;
        }
        row.push(<tr>{Object.assign([],x)}</tr>);
        x = [];
      }
      return (<div><table><tbody>{row}</tbody></table></div>);
    }*/

      ////////CELLA
      /*let JSON={"properties":{"label":"prova1", "DSLType": "cell", "returnType":"String"}, "data":{"result":{"_id":"hufhuihiuh"}}};
      let header, body;
      if (JSON.properties.DSLType == "cell"){
        let prop = JSON.properties;
        let data = JSON.data;
        header = < th >{prop.label} < /th>;
        if (typeof data.result == "number" || typeof data.result =="string"){
          body = < td >{data.result} < /td>;
        }
        //Lanciare errore nel caso il risultato sia array oppure object
        //
        if (typeof data.result == "object"){
          let firstProp
          for (var key in data.result){
            if (data.result.hasOwnProperty(key)){
              firstProp = data.result[key];
              break;
            }
          }
          if (typeof firstProp == "object" || typeof firstProp =="array"){}
            // Si dovrebbe lanciare un errore che riguarda il fatto che è
            // un array oppure un oggetto e che quindi non può essere mostrato
          else{
              body = < td >{firstProp} < /td>;
          }
        }
        return (<div>
        <div className = "DSLITitle">
        <h2>
          {dsli.name}
          </h2>
          </div>
          <div className="table-responsive">
          <table id="mytable" className="table table-bordred table-striped">
          <tbody>
            <tr>
              {header}{body}
              </tr>
              </tbody>
              </table>
              </div>
              </div>
            );
      }*/

      //////DOCUMENT
      let JSON = {
        "properties":{"DSLType": "document","rows":[{"label":"Nome", "name":"name"},{"label":"MarcaScarpe", "name":"scarpe.marca"}]
        },
        "data":{
          "result":[{"_id":"kkkkk", "name":"prova", "scarpe":{"_id":"eee", "marca":"nike"}},{"_id":"qqqq", "name":"prova1", "scarpe":{"_id":"ddd", "marca":"addidas"}},{"_id":"ffff", "name":"prova2", "scarpe":{"_id":"dd3d", "marca":"superga"}}]
        }
      };
      if(JSON.properties.DSLType == "document"){
        let prop = JSON.properties;
        let data = JSON.data;
        let table = [];
        let x = [];
        let y = [];
        console.log(data.result.length,prop.rows.length)
        if(this.flag){
          this.flag=false;
        for(let j =0; j<data.result.length; j++){
          for(let i=0; i<prop.rows.length; i++){
            var r = prop.rows[i].name.split('.');
            console.log("IOIJOIJ", i+j*2);
            if(typeof data.result[j][r[0]] == "object"){
              x[i+j*2] = <tr><th>{prop.rows[i].label}</th><td>{data.result[j][r[0]][r[1]]}</td></tr>;
            }
            else{
              x[i+j*2] = <tr><th>{prop.rows[i].label}</th><td>{data.result[j][r[0]]}</td></tr>;
            }
          }
            //dimenticati gli array e gli object
          table.push(<table><tbody>{Object.assign([],x)}</tbody></table>);
          x = [];
        }
      }

        return (<div>{table}</div>);
      }

  }
}

CollectionVisualize.contextTypes = {
  store : React.PropTypes.object
}

export default CollectionVisualize
