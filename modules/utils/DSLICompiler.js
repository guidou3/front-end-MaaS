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

	let compiledDSLI
	try{
		compiledDSLI = compile(preCompileFile);
	} catch(err){
		errback(err);
		return null;
	}

	var obj = undefined;
	function insert(object){
	 obj=object;
	}
	try{
		vm.runInNewContext(compiledDSLI.code, {insert:insert, require:require, cellModel:cellModel, dashboardModel:dashboardModel, collectionModel:collectionModel, documentModel:documentModel});
	} catch(err){
		errback(err);
		return null;
	}
	console.log(obj);
	return obj;
};

var executeQuery = function(dsli, data, token, cb) {
	request
		.post('https://maas-demo.herokuapp.com/api/dsl/'+dsli.id+'/execute')
		.send({query: data.toString(),token:token})
		.then(
			function(result){
				let res = JSON.parse(result.text)
				cb(null, res);
			},
			function(error){
				cb(JSON.parse(error.response.text).error, null);
			}
		)
}

exports.compileDSLI = compileDSLI;
exports.executeQuery = executeQuery;
