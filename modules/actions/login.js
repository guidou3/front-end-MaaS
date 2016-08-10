export function requestLogin() {
	return {
		type: 'waiting',
		operation: 'login'
	}
}

export function receiveLogin(bool, data) {
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
	}
}

export function logout() {
	return { type: 'logout'}
}
