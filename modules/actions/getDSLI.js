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
		dispatch(requestDSLI())
		return request
			.post(api + 'dsl/'+id+'/getCode?access_token='+getState().loggedUser.token)
			.send({token: guestToken})
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
