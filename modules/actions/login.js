import request from 'superagent'
import {push} from 'react-router-redux'

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
		/*return request
			.get('url1')
			.then(
				function(result){
          if(result.password == json.password)
          {
            dispatch(receiveLogin(true, result))
          }
          else
          {
            dispatch(receiveLogin(false, 'Password sbagliata'))
          }
				},
				function(error){
					dispatch(receiveLogin(false, error))
				}
			)*/
			/*
			return request
				.get('url1')
				.auth(json.username, json.password, {type:'auto'})
				.then(
					function(result){
	          dispatch(receiveLogin(true, result))
					},
					function(error){
						dispatch(receiveLogin(false, error))
					}
				)
			*/
		dispatch(receiveLogin(true, {
			username: 'sonoIlPrimoUtente',
			accessLevel: 'divino',
			image: null,
			DSLIList: null
		}))

		dispatch(push('/home'))
	}
}
