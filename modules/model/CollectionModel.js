import AttributeReader from '../utils/AttributeReader'
import {executeQuery} from '../utils/DSLICompiler'
import * as actions from '../actions/RootAction'
import React, { Component, PropTypes } from 'react'

import Components from '../components'
const {MTextBox, MTextArea, MButton} = Components

class CollectionModel {
  constructor(params, index, show){
    //super()
    AttributeReader.assertEmptyAttributes(params,function(param){});//lancio dell'errore
    AttributeReader.readRequiredAttributes(params,this,["param"],function(param){});//lancio dell'errore
    AttributeReader.readRequiredAttributes(this.param,this,["name"],function(param){});//lancio dell'errore
    AttributeReader.assertEmptyAttributes(index,function(param){});//lancio dell'errore
    //Index
    this.param = [];
    this.columns = [];

    AttributeReader.readOptionalAttributes(index,this,["param","columns"]);
    this.populate = [];
    this.sortby = "{'_id': 1}";
    this.order = "asc";

    AttributeReader.readOptionalAttributes(this.param,this,["populate","sortby","order","query"]);
    this.indexPopulate = this.populate;
    //Show

    AttributeReader.readOptionalAttributes(show,this,["populate","rows"]);

    this.flag = true;
    this.show = false ;
    this.storageResult = [];
    this.secondQuery = [];
    this.count =0;
    this.JSON;
  }

  getName(){
    return this.name;
  }
  getIndexColumns(){
    return this.columns;
  }
  getShowRows(){
    return this.rows;
  }
  getPopulate(){
     return this.indexPopulate;
   }
  getPopulateShow(){
    return this.populate;
  }
  DSLType(){
    return "collection";
  }

  buildQuery(){
    var query = "db.collection('" + this.name + "')";
    if(this.query)
      query = query + ".find(" + this.query + ")";
    else
      query = query + ".find()";
    if(this.order == "desc")
      return query + ".sort(-" + this.sortby + ")";
    else
      return query + ".sort(" + this.sortby + ")";
    return query;
  }

  buildShowQuery(id){
    var query = "db.collection(" + this.name + ").find({_id:" + id + "})";
    return query;
  }

  JSONbuild(result){
    return {
      "properties":{"DSLType":this.DSLType(), "indexColumns":this.getIndexColumns(), "showRows":this.getShowRows(), "showPopulate":this.getPopulateShow()},
      "data":{"result":result}
    };
  }

  render(store){
    var populate = this.getPopulate();
    if(this.flag){                                                              //EXECUTES ONCE
      this.flag = false;
      var query = this.buildQuery();
      executeQuery(store.getState().currentDSLI, query, store.getState().loggedUser.token, (err,res) =>{                                 //LAUNCH OF A QUERY
        if(err)                                                                 //CALLBACK FUNCTION WHERE QUERY ENDS
          return;
        this.storageResult = Object.assign({}, res);
        store.dispatch(actions.refresh());                                      //CALL RENDER TO DISPLAY DATA
      });
      if(populate){
        for(var k =0; k< populate.length; k++){
          this.count ++;
          var collection = populate[k].model;

          var populateQuery = "db.collection('"+ collection +"').find()";
          executeQuery(store.getState().currentDSLI, populateQuery, store.getState().loggedUser.token, (err,res) =>{            //SAME THING HERE
            if(err)
              return;
            this.secondQuery.push(Object.assign({}, res));
            store.dispatch(actions.refresh());
          });
        }
      }
    }

    if(this.count != 0){
      if(this.storageResult && this.secondQuery && this.count == Object.keys(this.secondQuery).length){                           //SET SHOW TO TRUE WHEN DATA IS READY
        this.show = true;
        for(var k=0; k<Object.keys(this.secondQuery).length; k++){
          var attribute = populate[k].path;
           for(var i=0; i<Object.keys(this.storageResult).length; i++){
            var id = this.storageResult[i][attribute];
            for(var j=0; j<Object.keys(this.secondQuery[k]).length; j++){
              if(this.secondQuery[k][j]._id == id){
                this.storageResult[i][attribute] = this.secondQuery[k][j];
              }
            }
          }
        }
        this.JSON=this.JSONbuild(this.storageResult);
      }
    }
    else if(this.storageResult){
      this.show = true;
      this.JSON=this.JSONbuild(this.storageResult);
    }

    if(!this.show)
      return <div>Eseguendo le query ...</div>
    else
      //return <div>Ciao, sono una COLLECTION!</div>                                       //RENDER CODE HERE, DATI IN JSON
      return <CollectionVisualize JSON = {this.JSON}/>
  }
}

class CollectionVisualize extends Component {
  constructor(props) {
    super(props)
    this.JSON = this.props.JSON
    this.warn = ""
    this.name = "SampleDSLI"
    this.flag =true;
  }

  render() {
    this.JSON = {
      "properties":{
        "DSLType":"collection",
        "indexColumns":[{"label":"Id", "name":"_id", "sortable":true, "selectable":true, "transformation":{}},{"label":"Scarpe", "name":"Scarpe.nome", "sortable":true, "selectable":true, "transformation":{}}],
        "showRows":[{"label":"Nome Scarpe", "name":'Scarpe.nome'}], "showPopulate":[{"path":"azienda","model":"azienda"}]},
      "data":{
        "result":[{"_id":"doeiioj","Scarpe":{"_id":"iofijfo","nome":"nike"}},{"_id":"doeiyystsfj","Scarpe":{"_id":"sssds","nome":"addidas"}}]}
    };

    let prop = this.JSON.properties;
    let data = this.JSON.data;
    let rows = [];
    let x = [];
    let y = [];

    if(this.flag){
      this.flag = false;
      for(let k = 0; k < prop.indexColumns.length; k++){
        y.push(<th>{prop.indexColumns[k].name}</th>)
      }
    }

    for(let j = 0; j < data.result.length; j++){
      for(let i = 0; i < prop.indexColumns.length; i++){
        var r = prop.indexColumns[i].name.split('.');
        if(typeof data.result[j][r[0]] == "object")
          x[i+j*2] = <td>{data.result[j][r[0]][r[1]]}</td>
        else{
          x[i+j*2] = <td>{data.result[j][r[0]]}</td>
        }
      }
      rows.push(<tr>{Object.assign([],x)}</tr>);
      x = [];
    }

    return (<div><table><thead><tr>{y}</tr></thead><tbody>{rows}</tbody></table></div>)
  }
}


  export default CollectionModel
