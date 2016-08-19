import request from 'superagent'
import {push} from 'react-router-redux'
import {getDSLIList} from './getDSLIList'

function requestLogin() {
	return {
		type: 'waiting',
		operation: 'login'
	}
}

function receiveLogin(bool, data) {
	if(bool) return {
		type: 'login',
		user: data
	}
	else return {
<<<<<<< HEAD
		type: 'failedLogin',
=======
		type: 'error',
>>>>>>> master
		error: data
	}
}

export function login(json) {
	return function(dispatch, getState, api){
		dispatch(requestLogin())
		return request
			.post(api + 'accounts/login?include=user')
			.send({
				email: json.mail,
				password: json.pwd
			})
			.then(
				function(result){
					let res = JSON.parse(result.text);
					dispatch(receiveLogin(true, {
						username: res.userId,
						accessLevel: res.user.dutyId,
						token: res.id,
						company: res.user.companyId,
						DSLIList: [{id: "prova"}]
					}))
					dispatch(getDSLIList()).then(() => (dispatch(push('/home'))))
				},
				function(error){
					dispatch(receiveLogin(false, error))
				})
	}
}
