/*
* Name : deleteData.js
* Location : ./modules/actions/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-07-27     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
import request from 'superagent'

function requestDeleteData() {
	return {
		type: 'waiting',
		operation: 'deleteData'
	}
}

function receiveDeleteData(bool, data) {
	if(bool) return {
		type: 'deleteData',
		id: data
	}
	else return {
		type: 'error',
		error: data
	}
}

export function deleteData(dataId) {
	return function(dispatch, getState, api){
		dispatch(requestDeleteData())
		return request
			.del(api + 'companies/' + getState().loggedUser.company+'/databases/'+dataId+'?access_token='+getState().loggedUser.token)
			.then(
				function(){
					dispatch(receiveDeleteData(true, dataId))

				},
				function(error){
					dispatch(receiveDeleteData(false, error.status))
				}
			)
	}
}
