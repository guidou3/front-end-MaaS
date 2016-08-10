//le funzioni receive...

import {checkUsername} from './userRegistration'

export function requestCheckCompanyName() {
	return { type: 'waitingCheckCompanyName' }
}

export function receiveCheckCompanyName(bool) {
	if(bool) return { type: 'successCheckCompanyName' }
	else return { type: 'failedCheckCompanyName' }
}

export function checkCompanyName(json) {
	var companyName = json.companyName;
	if(companyName == null)
	{
		//errore
	}
	else
	{
		return function(dispatch){
			dispatch(requestCheckCompanyName())
			/*return request
				.get('url1')
				.query({company: companyName})
				.then(
					function(){
						store.dispatch(receiveCheckCompanyName(false))
					},
					function(){
						store.dispatch(receiveCheckCompanyName(true))
					}
				)*/
			dispatch(companyRegistration(json))
		}
	}
}

export function requestCompanyRegistration() {
	return { type: 'waitingCompanyRegistration' }
}

export function receiveCompanyRegistration(bool, text) {
	if(bool) return {
		type: 'successCompanyRegistration',
		companyName: text
		}
	else return {
		type: 'failedCompanyRegistration',
		error: text
		}
}

export function companyRegistration(json) {
	return function(dispatch){
		dispatch(requestCompanyRegistration())
		/*return request
			.post('url1')
			.send({
				company: json.companyName,
				databaseLink: json.databaseLink
			})
			.then(function() {
					dispatch(receiveCompanyRegistration(true, json.companyName))
					dispatch(userRegistration(json))
				},
				function(err){
					dispatch(receiveCompanyRegistration(false, err))
				}
			)*/
		dispatch(receiveCompanyRegistration(true, json.companyName))
		dispatch(checkUsername(json.ownerMail))
	}
}
