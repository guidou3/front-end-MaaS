/*
* Name : deleteDSLI.js
* Location : ./modules/actions/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-15     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/

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
				},
				function(error){
					dispatch(receiveDeleteDSLI(false, error.status))
				}
			)
	}
}
