/*jshint esversion: 6 */
/*
 * Name : showCollectionVisualize.js
 * Location : ./modules/model/
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.1.0           2016-09-08    Roberto D'Amico
 * -------------------------------------------------
 * Codifica modulo
 * =================================================
 */
 import React, { Component, PropTypes } from 'react'
 import * as actions from '../actions/RootAction'
 import Components from '../components'
 const {MTextBox, MTextArea, MButton} = Components

 class CollectionRow extends Component {
   constructor(props) {
     super(props)
   }
   render() {
     let body = []
     let dsli = this.props.dsli
     let header = this.props.header.rows
     let row = this.props.row

     body[0] = <td><b>{header[row].label.toString()}</b></td>

     var r = header[row].name.split('.');
     if(r.length > 1){
       if(dsli[r[0]] && dsli[r[0]][r[1]])
         body[1] = <td>{dsli[r[0]][r[1]].toString()}</td>
       else
         body[1] = <td>/</td>
     }
     else{
       if(dsli[r[0]])
         body[1] = <td>{dsli[r[0]].toString()}</td>
       else
         body[1] = <td>/</td>
     }

     return (
       <tr>
         {body}
       </tr>
     )
   }
 }

 class showCollectionVisualize extends Component {
   constructor(props) {
     super(props)
     console.log("prova");
     this.warn = ""
     console.log("VISUALIZE JSON :");
     console.log(this.props.JSON);
     this.JSON = this.props.JSON
     this.dsli = this.props.dsli
   }

   render() {
     let prop = this.JSON.properties
     let body = []
     let n = prop.rows.length

     for (let i = 0; i < n; i++) {
       body[i] = <CollectionRow header={prop} dsli={this.JSON.data.result[0]} row ={i}/>
     }
     return (
       <div>
         <div className = "DSLITitle">
           <h2>
             {this.dsli.name}
           </h2>
         </div>
         <div className="table-responsive">
           <table id="mytable" className="table table-bordred table-striped">
             <tbody>
               {body}
             </tbody>
           </table>
         </div>
       </div>
     )
   }
 }

 showCollectionVisualize.contextTypes = {
   store : React.PropTypes.object
 }

 export default showCollectionVisualize
