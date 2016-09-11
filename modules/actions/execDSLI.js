/*
* Name : execDSLI.js
* Location : ./modules/actions/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-23     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import request from 'superagent'

function requestExec() {
	return {
		type: 'waiting',
		operation: 'execDSLI'
	}
}

function receiveExec(bool, data) {
	if(bool) return {
		type: 'execDSLI',
		result: data
	}
	else return {
		type: 'error',
		error: data
	}
}

export function execDSLI(id, data) {
	return function(dispatch, getState, api){
		dispatch(requestExec())
		console.log("EXEC");
		return request
			.post(api + 'dsl/'+id+'/execute?access_token='+getState().loggedUser.token)
      .send({query: data})
			.then(
				function(result){
					console.log("RESULT");
					console.log(result.body);
					dispatch(receiveExec(true, result.body))
				},
				function(error){
					dispatch(receiveExec(false, error.status))
				}
			)
	}
}
