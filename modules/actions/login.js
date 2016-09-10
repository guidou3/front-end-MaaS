/*
* Name : login.js
* Location : ./modules/actions/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-01     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
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
		type: 'error',
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
					welcomeUser(result, dispatch)},
				function(error){
					dispatch(receiveLogin(false, error))
				})
	}
}

function requestEmbodyUser() {
	return {
		type: 'waiting',
		operation: 'embodyUser'
	}
}

function failedEmbodyUser(data) {
	return {
		type: 'error',
		error: data
	}
}

export function embodyUser(email) {
	return function(dispatch, getState, api){
		dispatch(requestEmbodyUser())
		return request
			.post(api + 'accounts/'+ email + '/impersonate?include=user&access_token=' + getState().loggedUser.token)
			.then(
				function(result){
					welcomeUser(result, dispatch)},
				function(err){
					dispatch(failedEmbodyUser(err))
				}
			)
	}
}

export function logout() {
	return {
		type: 'logout'
	}
}

function welcomeUser(result, dispatch) {
	let res = JSON.parse(result.text);
	dispatch(receiveLogin(true, {
		account: res.accountId,
		accessLevel: res.user.dutyId,
		token: res.id,
		company: res.user.companyId
	}))
	if(res.user.dutyId == 9) {
		dispatch(push('/homeDeveloper'))
	}
	else {
		dispatch(getDSLIList()).then(() => (dispatch(push('/home'))))
	}
}
