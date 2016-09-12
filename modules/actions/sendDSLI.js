/*
* Name : sendDSLI.js
* Location : ./modules/actions/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-09-08     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import request from 'superagent'

function requestSendDSLI() {
	return {
		type: 'waiting',
		operation: 'sendDSLI'
	}
}

function receiveSendDSLI(bool, data) {
	if(bool) return {
		type: 'sendDSLI'
	}
	else return {
		type: 'error',
		error: data
	}
}

export function sendDSLI(id, mail) {
	return function(dispatch, getState, api){
		dispatch(requestSendDSLI())
		return request
			.post(api + 'dsl/'+id+'/sendDSLI?access_token='+getState().loggedUser.token)
			.send({
				email: mail
			})
			.then(
				function(){
					dispatch(receiveSendDSLI(true))
				},
				function(error){
					dispatch(receiveSendDSLI(false, error.status))
				}
			)
	}
}
