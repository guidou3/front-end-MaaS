/*
* Name : saveTextDSLI.js
* Location : ./modules/actions/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-30     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import request from 'superagent'

function requestSaveTextDSLI() {
	return {
		type: 'waiting',
		operation: 'saveTextDSLI'
	}
}

function receiveSaveTextDSLI(bool, text) {
	if(bool) return {
		type: 'saveTextDSLI',
		newText: text
	}
	else return {
		type: 'error',
		error: text
		}
}

export function saveTextDSLI(dsli) {
	return function(dispatch, getState, api){
		dispatch(requestSaveTextDSLI())
		return request
			.put(api + 'companies/'+ getState().loggedUser.company + '/dsls/' + dsli.id + '?access_token=' + getState().loggedUser.token)
			.send({
				name: dsli.name,
				code: dsli.code,
				lastModifiedDate: Date(),
				databaseId: dsli.databaseId
			})
			.then(function() {
					dispatch(receiveSaveTextDSLI(true, dsli))
				},
				function(err){
					dispatch(receiveSaveTextDSLI(false, err.status))
				}
			)
	}
}
