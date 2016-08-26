import request from 'superagent'
import {push} from 'react-router-redux'

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
		return request
			.post(api + 'companies/'+ getState().loggedUser.company + '/dsls?access_token=' + getState().loggedUser.token)
			.send({
				name: data.name,
				code: data.code,
				lastModifiedDate: Date(),
				accountId: getState().loggedUser.username,
				databseId: data.db,
				permits: 0
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
