import request from 'superagent'

function requestResetMail() {
	return {
		type: 'waiting',
		operation: 'addDatabase'
	}
}

function receiveResetMail(bool, data) {
	if(bool) return {
		type: 'sendResetMail'
		}
	else return {
		type: 'error',
		error: data
		}
}

export function sendResetMail(email) {
	return function(dispatch, getState, api){
		dispatch(requestResetMail())
		return request
		  .post(api + 'accounts/'+email+'/pwdmail')
			.then(function(){
					dispatch(receiveResetMail(true))
				},
				function(err){
					dispatch(receiveResetMail(false, err))
				}
			)
	}
}
