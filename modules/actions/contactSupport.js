import request from 'superagent'
import {push} from 'react-router-redux'

function requestSupport() {
	return {
		type: 'waiting',
		operation: 'support'
	}
}

function receiveSupport(bool, data) {
	if(bool) return {
		type: 'support',
		DSLI: data
	}
	else return {
		type: 'error',
		error: data
	}
}

export function contactSupport(data) {
	return function(dispatch, getState, api){
		dispatch(requestSupport())
    if(data.permits == undefined)
      data.permits = 0
		return request
			.post(api + 'accounts/help/'+ data.email)
			.send({text:data.text})
			.then(
				function(result){
					dispatch(receiveSupport(true, result))
				},
				function(error){
					dispatch(receiveSupport(false, error))
				}
			)
	}
}
