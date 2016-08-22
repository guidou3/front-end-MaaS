import request from 'superagent'
import * as actions from './RootAction'

function requestDeleteDSLI() {
	return {
		type: 'waiting',
		operation: 'deleteDSLI'
	}
}

function receiveDeleteDSLI(bool, text) {
	if(bool) return { type: 'deleteDSLI' }
	else return {
		type: 'error',
		error: text
	}
}

export function deleteDSLI(dsliId) {
	return function(dispatch, getState, api){
		dispatch(requestDeleteDSLI())
		return request
			.del(api + 'companies/'+ getState().loggedUser.company + '/dsls/' + dsliId + '?access_token=' + getState().loggedUser.token)
			.then(
				function(){
					dispatch(receiveDeleteDSLI(true))
					dispatch(actions.getDSLIList())
				},
				function(error){
					dispatch(receiveDeleteDSLI(false, error))
				}
			)
	}
}
