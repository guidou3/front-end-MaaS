/*
* Name : addDatabase.js
* Location : ./modules/actions/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-07-26     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import request from 'superagent'
import {getDatabase} from './getDatabase'

function requestAddDatabase() {
	return {
		type: 'waiting',
		operation: 'addDatabase'
	}
}

function receiveAddDatabase(bool, data) {
	if(bool) return {
		type: 'addDatabase'
		}
	else return {
		type: 'error',
		error: data
		}
}

export function addDatabase(data) {
	return function(dispatch, getState, api){
		dispatch(requestAddDatabase())
		return request
		  .post(api + 'companies/'+ getState().loggedUser.company+'/databases?access_token='+getState().loggedUser.token)
			.send({
				uri: data.uri,
				tag: data.tag
			})
			.then(function() {
					dispatch(receiveAddDatabase(true))
				},
				function(err){
					dispatch(receiveAddDatabase(false, err.status))
				}
			)
	}
}
