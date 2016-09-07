import request from 'superagent'

function requestDatabase() {
	return {
		type: 'waiting',
		operation: 'getDatabase'
	}
}

function receiveDatabase(bool, data) {
	if(bool) return {
		type: 'getDatabase',
		listData: data //lista
	}
	else return {
		type: 'error',
		error: data
	}
}

export function getDatabase() {
	return function(dispatch, getState, api){
		dispatch(requestDatabase())
		return request
			.get(api + 'companies/'+getState().loggedUser.company+'/databases?access_token='+getState().loggedUser.token)
			.then(
				function(result){
					let res = JSON.parse(result.text)
					dispatch(receiveDatabase(true, res))
				},
				function(error){
					dispatch(receiveDatabase(false, error))
				}
			)
	}
}
