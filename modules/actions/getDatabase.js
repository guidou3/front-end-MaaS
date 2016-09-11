/*
* Name : getDatabase.js
* Location : ./modules/actions/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-27     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import request from 'superagent'

function requestDatabase() {
	return {
		type: 'waiting',
		operation: 'getDatabase'
	}
}

function receiveDatabase(bool, data) {
	if(bool) return {
		type: 'getDatabase',
		listData: data //lista
	}
	else return {
		type: 'error',
		error: data
	}
}

export function getDatabase() {
	return function(dispatch, getState, api){
		dispatch(requestDatabase())
		return request
			.get(api + 'companies/'+getState().loggedUser.company+'/databases?access_token='+getState().loggedUser.token)
			.then(
				function(result){
					let res = JSON.parse(result.text)
					dispatch(receiveDatabase(true, res))
				},
				function(error){
					dispatch(receiveDatabase(false, error.status))
				}
			)
	}
}
