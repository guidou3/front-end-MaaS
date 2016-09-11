/*
* Name : contactSupport.js
* Location : ./modules/actions/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-07-30     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import request from 'superagent'

function requestSupport() {
	return {
		type: 'waiting',
		operation: 'support'
	}
}

function receiveSupport(bool, data) {
	if(bool) return {
		type: 'support'
	}
	else return {
		type: 'error',
		error: data
	}
}

export function contactSupport(data) {
	return function(dispatch, getState, api){
		dispatch(requestSupport())
		return request
			.post(api + 'accounts/help/'+ data.email)
			.send({text:data.text})
			.then(
				function(){
					dispatch(receiveSupport(true))
				},
				function(error){
					dispatch(receiveSupport(false, error.status))
				}
			)
	}
}
