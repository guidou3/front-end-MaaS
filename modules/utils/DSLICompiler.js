/*
* Name : DSLICompiler.js
* Location : /modules/utils
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.0.1          2016-08-08     Roberto D'Amico
* -------------------------------------------------
* Codifica modulo.
* =================================================
*/

import cellModel from '../model/CellModel';
import collectionModel from '../model/CollectionModel';
import dashboardModel from '../model/DashboardModel';
import documentModel from '../model/DocumentModel';

import {parse, expand, compile} from 'sweet.js'
var macro = require('includes!../../macro.sjs');
import request from 'superagent'
import vm from 'vm';

var compileDSLI = function(code, errback) {
	let preCompileFile = macro + code;

	let compiledDSLI = compile(preCompileFile);

	var obj = undefined;
	function insert(object){
	 obj=object;
	}
	vm.runInNewContext(compiledDSLI.code, {insert:insert, require:require, cellModel:cellModel, dashboardModel:dashboardModel, collectionModel:collectionModel, documentModel:documentModel});
	console.log(obj);
	return obj;
};

var executeQuery = function(dsli, data, token, cb) {
	request
		.post('https://mass-demo.herokuapp.com/api/dsl/'+dsli.id+'/execute?access_token='+token)
		.send({query: data.toString()})
		.then(
			function(result){
				let res = JSON.parse(result.text)
				cb(null, res);
			},
			function(error){
				console.log(error.response.text);
				cb(error, null);
			}
		)
}

exports.compileDSLI = compileDSLI;
exports.executeQuery = executeQuery;
