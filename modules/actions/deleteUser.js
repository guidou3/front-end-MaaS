import request from 'superagent'

export function requestDeleteUser() {
	return {
		type: 'waiting',
		operation: 'deleteUser'
	}
}

export function receiveDeleteUser(bool, text) {
	if(bool) return { type: 'deleteUser' }
	else return {
		type: 'error',
		error: text
	}
}

export function deleteUser(email) {
	return function(dispatch, getState, api){
		dispatch(requestDeleteUser())
		return request
			.del(api + 'companies/'+ getState().loggedUser.company + '/users/' + email + '?access_token=' + getState().loggedUser.token)
			.then(
				function(){
					dispatch(receiveDeleteUser(true))
				},
				function(error){
					dispatch(receiveDeleteUser(false, error.status))
				}
			)
	}
}
