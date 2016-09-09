import request from 'superagent'
import {push} from 'react-router-redux'

function requestCheckUsername() {
	return {
		type: 'waiting',
	 	operation: 'checkUsername'
	}
}

function receiveCheckUsername(bool) {
	if(bool) return { type: 'successCheckUsername' }
	else return { type: 'failedCheckUsername' }
}

function receiveError(error) {
		return {
			type: 'error',
			error: error
		}
}

export function checkUsername(data) {
	return function(dispatch, getState, api){
		dispatch(requestCheckUsername())
		return request
			.get(api + 'accounts/'+ data.email+'/exists')
			.then(
				function(res){
					if(res.body.exists) {
						dispatch(receiveCheckUsername(false))
					}
					else {
						dispatch(receiveCheckUsername(true))
						dispatch(userRegistration(data, data.dutyId))
					}
				},
				function(error){
					dispatch(receiveError(error.status))
				}
			)
	}
}

export function requestUserRegistration() {
	return {
		type: 'waiting',
		operation: 'userRegistration'
 }
}

export function receiveUserRegistration(bool, data) {
	if(bool) return {
		type: 'userRegistration',
		user: data
	}
	else return {
		type: 'error',
		error: data
		}
}

export function userRegistration(data, role) {
	return function(dispatch, getState, api){
		dispatch(requestUserRegistration())
		return request
			.post(api + 'companies/'+data.companyName+'/users')
			.send({
				email: data.ownerMail,
				password: "asd",
				dutyId: role,
				subscribedAt: Date(),
				emailVerified: false
			})
			.then(function(result) {
					dispatch(receiveUserRegistration(true, result))
				},
				function(err){
					dispatch(receiveUserRegistration(false, err.status))
				}
			)
	}
}
