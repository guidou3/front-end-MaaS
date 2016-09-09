import request from 'superagent'

function requestChangePassword() {
	return {
		type: 'waiting',
		operation: 'changePassword'
	}
}

function receiveChangePassword(bool, text) {
	if(bool) return { type: 'changePassword' }
	else return {
		type: 'error',
		error: text
	}
}

export function changePassword(newPassword, token) {
	return function(dispatch, getState, api){
		dispatch(requestChangePassword())
		return request
			.post(api + 'accounts/newpwd')
			.send({
				pass: newPassword,
				resetToken: token
			})
			.then(
				function(){
					dispatch(receiveChangePassword(true))
				},
				function(error){
					dispatch(receiveChangePassword(false, error.status))
				}
			)
	}
}
