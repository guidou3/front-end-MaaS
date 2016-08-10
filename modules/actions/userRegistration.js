export function requestCheckUsername() {
	return { type: 'waitingCheckUsername' }
}

export function receiveCheckUsername(bool) {
	if(bool) return { type: 'successCheckUsername' }
	else return { type: 'failedCheckUsername' }
}

export function checkUsername(username) {
	if(username == null)
	{
		//errore
	}
	else
	{
		return function(dispatch) {
			dispatch(requestCheckUsername())
			return request
				.get('url2')
				.query({username: username})
				.then(
					function(){
						dispatch(receiveCheckUsername(false))
					},
					function(){
						dispatch(receiveCheckUsername(true))
					}
				)
		}
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

export function userRegistration(data) {
	return function(dispatch){
		dispatch(requestUserRegistration())
		return request
			.post('url1')
			.send({
				username: data.user,
				password: data.password
			})
			.then(function(result) {
					dispatch(receiveUserRegistration(true, result))
				},
				function(err){
					dispatch(receiveUserRegistration(false, err))
				}
			)
	}
}
