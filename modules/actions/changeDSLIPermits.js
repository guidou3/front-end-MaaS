import request from 'superagent'

export function requestChangeDSLIPermits() {
	return {
		type: 'waiting',
		operation: 'changeDSLIPermits'
	}
}

export function receiveChangeDSLIPermits(bool, data) {
	if(bool) return {
		type: 'changeDSLIPermits',
		newPermits: data
	}
	else return {
		type: 'error',
		error: data
		}
}

export function changeDSLIPermits(dsli, newPermit) { //newPermits is an array
	return function(dispatch, getState, api){
		dispatch(requestChangeDSLIPermits())
		return request
			.put(api + 'companies/'+ getState().loggedUser.company + '/dsls/' + dsli.id + '?access_token=' + getState().loggedUser.token)
			.send({
				lastModifiedDate: Date(),
				permits: newPermit
			})
			.then(function() {
					dispatch(receiveChangeDSLIPermits(true, newPermit))
				},
				function(error){
					dispatch(receiveChangeDSLIPermits(false, error.status))
				}
			)
	}
}
