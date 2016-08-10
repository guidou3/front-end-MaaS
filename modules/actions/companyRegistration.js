//le funzioni receive...

import userRegistration from './userRegistration'

export function requestCheckCompanyName() {
	return { type: 'waitingCheckCompanyName' }
}

export function receiveCheckCompanyName(bool) {
	if(bool) return { type: 'checkCompanyName' }
	else return { type: 'failedCheckCompanyName' }
}

export function checkCompanyName(companyName) {
	if(companyName == null)
	{
		//errore
	}
	else
	{
		return function(dispatch){
			dispatch(requestCheckCompanyName())
			return request
				.get('url1')
				.query({company: companyName})
				.then(
					function(){
						dispatch(receiveCheckCompanyName(false))
					},
					function(){
						dispatch(receiveCheckCompanyName(true))
					}
				)
		}
	}
}

export function requestCompanyRegistration() {
	return {
		type: 'waiting',
		operation: 'companyRegistration'
	}
}

export function receiveCompanyRegistration(bool, text) {
	if(bool) return {
		type: 'companyRegistration'
		}
	else return {
		type: 'error',
		error: text
		}
}

export function companyRegistration(data) {
	return function(dispatch){
		dispatch(requestCompanyRegistration())
		return request
			.post('url1')
			.send({
				company: data.companyName,
				databaseLink: data.databaseLink
			})
			.then(function() {
					dispatch(receiveCompanyRegistration(true))
					dispatch(userRegistration(data))
				},
				function(err){
					dispatch(receiveCompanyRegistration(false, err))
				}
			)
	}
}
