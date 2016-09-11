/*
* Name : getDSLI.js
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

function requestDSLI() {
	return {
		type: 'waiting',
		operation: 'getDSLI'
	}
}

function receiveDSLI(bool, data) {
	if(bool) return {
		type: 'getDSLI',
		dsli: data
	}
	else return {
		type: 'error',
		error: data
	}
}

export function getDSLI(id, guestToken) {
	return function(dispatch, getState, api){
		let token = guestToken || getState().loggedUser.token
		dispatch(requestDSLI())
		return request
			.get(api + 'dsl/'+id+'?access_token='+token)
			.then(
				function(result){
					dispatch(receiveDSLI(true, result.body))
				},
				function(error){
					dispatch(receiveDSLI(false, error.status))
				}
			)
	}
}
