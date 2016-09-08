import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/RootAction'
import Components from '../components'
import PageBuilder from '../services/PageBuilder'
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
  buildCellFromJSON(JSON){
    let header,body;
    if (JSON.properties.DSLType == "cell"){
      let prop = JSON.properties;
      let data = JSON.data;
      console.log("HBUBUBUBYU",prop,data);
      header = < th >{prop.label} < /th>;

      if (typeof data.result == "number" || typeof data.result =="string"){
        body = < td >{data.result} < /td>;
      }
      console.log("HEADER",header,body);
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
      return (<div className="table-responsive">
        <table id="mytable" className="table table-bordred table-striped">
        <tbody><tr>{header}{body}</tr> </tbody>
            </table>
            </div>

          );
  }
}
  render() {
    const { store } = this.context
    let dsli = store.getState().currentDSLI
    //let data = store.getState().currentDSLI.result
    ////collection
    /*let JSON ={
      "properties":{
        "DSLType":"collection",
        "indexColumns":[{"label":"Id", "name":"_id", "sortable":true, "selectable":true, "transformation":{}},{"label":"Scarpe", "name":"Scarpe.nome", "sortable":true, "selectable":true, "transformation":{}}],
        "showRows":[{"label":"Nome Scarpe", "name":'Scarpe.nome'}], "showPopulate":[{"path":"azienda","model":"azienda"}]},
    "data":{
      "result":[{"_id":"doeiioj","Scarpe":{"_id":"iofijfo","nome":"nike"}},{"_id":"doeiyystsfj","Scarpe":{"_id":"sssds","nome":"addidas"}}]}
  };
    if(JSON.properties.DSLType == "collection"){
      //Parte index
      let prop = JSON.properties;
      let data = JSON.data;
      let rows = [];
      let x = [];
      let y = [];
      //console.log(data.result.length,prop.rows.length)
      //Manca sortable, selectable,transofrmation
      if(this.flag){
        this.flag=false;
        for(let k=0; k<prop.indexColumns.length; k++){
          y.push(<th>{prop.indexColumns[k].name}</th>)
        }
      for(let j =0; j<data.result.length; j++){
        for(let i=0; i<prop.indexColumns.length; i++){

          var r = prop.indexColumns[i].name.split('.');
          console.log(r);
          if(typeof data.result[j][r[0]] == "object"){
            console.log(r);
            x[i+j*2] = <td>{data.result[j][r[0]][r[1]]}</td>;
          }
          else{
            x[i+j*2] = <td>{data.result[j][r[0]]}</td>;
          }
        }
          //dimenticati gli array e gli object
        rows.push(<tr>{Object.assign([],x)}</tr>);
        x = [];
      }
      return (<div><table><thead><tr>{y}</tr></thead><tbody>{rows}</tbody></table></div>)
    }
  }*/
    //////DASHBOARD
    let JSON = { "properties":{"DSLType":'dashboard', "rows":[[{"label":"Gigi","type":"cell","dsl":"cell(label:'nome', type:'link', value : { collection : 'Account'})"},{"label":"Gigi","type":"cell","dsl":"cell(label:\"nome\", type:\"link\", value:\"ciao\")"}],[{"label":"Gigi","type":"cell","dsl":"cell(label:\"nome\", type:\"link\", value:43)"},{"label":"Gigi","type":"cell","dsl":"cell(label:\"nome\", type:\"link\", value:\"ciao1\")"}]]}}
    if(JSON.properties.DSLType == "dashboard" && this.flag){
      this.flag=false;
      let data = JSON.properties.rows;
      let x = [], y=[], z=[];
      let row = [];
      for(let j=0; j<data.length; j++){
        for(let i=0; i<data[j].length; i++){
          //lancio la dsl al PageBuilder
          y[i]=new PageBuilder(data[j][i].dsl);
          if(data[i][j].type == "cell"){
            z[i]=y[i].getJSONcell();

          }
          x[i]=this.buildCellFromJSON(z[i]);
          //x[i]= [<th>{data[i][j].label}</th>,<td>{z[i].data.result}</td>];
        }
        row.push(<tr>{Object.assign([],x)}</tr>);
        x = [];
      }
      return (<div><table><tbody>{row}</tbody></table></div>);
    }

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
      /*let JSON = {
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
      }*/

  }
}

CollectionVisualize.contextTypes = {
  store : React.PropTypes.object
}

export default CollectionVisualize
