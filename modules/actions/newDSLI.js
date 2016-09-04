import request from 'superagent'

function requestNewDSLI() {
	return {
		type: 'waiting',
		operation: 'newDSLI'
	}
}

function receiveNewDSLI(bool, data) {
	if(bool) return {
		type: 'newDSLI',
		DSLI: data
	}
	else return {
		type: 'error',
		error: data
	}
}

export function newDSLI(data) {
	return function(dispatch, getState, api){
		dispatch(requestNewDSLI())
    if(data.permits == undefined)
      data.permits = 0
		return request
			.post(api + 'companies/'+ getState().loggedUser.company + '/dsls?access_token=' + getState().loggedUser.token)
			.send({
				name: data.name,
				code: data.code,
				lastModifiedDate: Date(),
				accountId: getState().loggedUser.account,
				databseId: data.db,
				permits: data.permits
			})
			.then(
				function(result){
					dispatch(receiveNewDSLI(true, result))
				},
				function(error){
					dispatch(receiveNewDSLI(false, error))
				}
			)
	}
}
