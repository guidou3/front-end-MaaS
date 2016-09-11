/*
* Name : changePassword.js
* Location : ./modules/actions/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-07-27     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
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
