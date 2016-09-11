/*
* Name : getDSLIList.js
* Location : ./modules/actions/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-30     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import request from 'superagent'

function requestDSLIList() {
	return {
		type: 'waiting',
		operation: 'getDSLIList'
	}
}

function receiveDSLIList(bool, data) {
	if(bool) return {
		type: 'getDSLIList',
		listDSLI: data //lista
	}
	else return {
		type: 'error',
		error: data
	}
}

export function getDSLIList() {
	return function(dispatch, getState, api){
		dispatch(requestDSLIList())
		return request
			.get(api + 'companies/'+getState().loggedUser.company+'/dsls?access_token='+getState().loggedUser.token)
			.then(
				function(result){
					dispatch(receiveDSLIList(true, result.body))
				},
				function(error){
					dispatch(receiveDSLIList(false, error.status))
				}
			)
	}
}
