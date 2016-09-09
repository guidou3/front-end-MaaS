import request from 'superagent'

function requestSetAccessLevel() {
	return {
		type: 'waiting',
		operation: 'setAccessLevel'
	}
}

function receiveSetAccessLevel(bool, text) {
	if(bool) return {
		type: 'setAccessLevel'
	}
	else return {
		type: 'error',
		error: text
		}
}

export function setAccessLevel(user) {
	return function(dispatch, getState, api){
		dispatch(requestSetAccessLevel())
		return request
			.post(api + 'companies/'+ getState().loggedUser.company + '/users/' + user.id + '/permit/'+ user.level +'?access_token=' + getState().loggedUser.token)
			.then(function() {
					dispatch(receiveSetAccessLevel(true))
				},
				function(err){
					dispatch(receiveSetAccessLevel(false, err.status))
				}
			)
	}
}
