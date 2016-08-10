import request from 'superagent'
import {push} from 'react-router-redux'
import {getCompanies} from './RootAction'

export function requestLogin() {
	return {
		type: 'waiting',
		operation: 'login'
	}
}

export function receiveLogin(bool, data) {
	if(bool) return {
		type: 'successLogin',
		user: data
	}
	else return {
		type: 'failedLogin',
		error: data
	}
}

export function login(json) {
	return function(dispatch){
		dispatch(requestLogin())
		return request
			.post('http://www.zinoo.it:3000/api/accounts/login')
			.send({
				email: json.mail,
				password: json.pwd
			})
			.then(
				function(result){
					let response = JSON.parse(result.text);
					dispatch(receiveLogin(true, {
						username: 'sonoIlPrimoUtente',
						accessLevel: 'divino',
						image: response.id,
						DSLIList: null
					}))
					console.log(response.id);
					dispatch(getCompanies(response.id))
					dispatch(push('/home'))
				},
				function(error){
					dispatch(receiveLogin(false, error))
				}
			)
	}
}
