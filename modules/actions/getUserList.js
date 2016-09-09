import request from 'superagent'

function requestUserList() {
	return {
		type: 'waiting',
		operation: 'getUserList'
	}
}

function receiveUserList(bool, data) {
	if(bool) return {
		type: 'getUserList',
		userList: data //lista
	}
	else return {
		type: 'error',
		error: data
	}
}

export function getUserList() {
	return function(dispatch, getState, api){
		dispatch(requestUserList())
		return request
			.get(api + 'companies/' + getState().loggedUser.company + '/users?access_token=' + getState().loggedUser.token)
			.then(
				function(result){
					dispatch(receiveUserList(true, result.body))
				},
				function(error){
					dispatch(receiveUserList(false, error.status))
				}
			)
	}
}
