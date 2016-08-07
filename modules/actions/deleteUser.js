export function requestDeleteUser() {
	return {
		type: 'waiting',
		operation: 'deleteUser'
	}
}

export function receiveDeleteUser(bool, text) {
	if(bool) return { type: 'successDeleteUser' }
	else return {
		type: 'failedDeleteUser',
		error: text
	}
}

export function deleteUser() {
	return function(dispatch){
		dispatch(requestDeleteUser())
		/*return request
			.del(url)
			.then(
				function(){
					dispatch(receiveDeleteUser(true))
				},
				function(error){
					dispatch(receiveDeleteUser(false, error))
				}
			)*/
		dispatch(receiveDeleteUser(true))
	}
}
