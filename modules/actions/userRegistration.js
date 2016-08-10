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
			/*return request
				.get('url2')
				.query({username: username})
				.then(
					function(){
						dispatch(receiveCheckUsername(false))
					},
					function(){
						dispatch(receiveCheckUsername(true))
					}
				)*/
			dispatch(receiveCheckUsername(true))
		}
	}
}

export function requestUserRegistration() {
	return { type: 'waitingUserRegistration' }
}

export function receiveUserRegistration(bool, text) {
	if(bool) return {
		type: 'successUserRegistration',
		username: text
	}
	else return {
		type: 'failedUserRegistration',
		error: text
		}
}

export function userRegistration(json) {
	return function(dispatch){
		dispatch(requestUserRegistration())
		/*return request
			.post('url1')
			.send({
				username: json.user,
				password: json.password
			})
			.then(function() {
					dispatch(receiveUserRegistration(true, json.user))
				},
				function(err){
					dispatch(receiveUserRegistration(false, err))
				}
			)*/
		dispatch(receiveUserRegistration(true, json.user))
	}
}
