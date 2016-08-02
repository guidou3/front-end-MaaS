//le funzioni receive... 

import userRegistration from './userRegistration'

export function requestCheckCompanyName() {
	return { type: waitingCheckCompanyName }
}

export function receiveCheckCompanyName(bool) {
	if(bool) return { type: successCheckCompanyName }
	else return { type: failedCheckCompanyName }
}

export function checkCompanyName(json) {
	var companyName = json.companyName;
	if(companyName == null)
	{
		//errore
	}
	else
	{
		store.dispatch(requestCheckCompanyName())
		return
		{
			request
			.get('url1')
			.query({company: companyName})
			.then(
				function(error){
					store.dispatch(receiveCheckCompanyName(true))
				},
				function(result){
					store.dispatch(receiveCheckCompanyName(false))
				}
			)
		}
	}
}

export function requestCompanyRegistration() {
	return { type: waitingCompanyRegistration }
}

export function receiveCompanyRegistration(bool, text) {
	if(bool) return { type: successCompanyRegistration }
	else return { 
		type: failedCompanyRegistration,
		error: text
		}
}

export function companyRegistration(json) {
	var companyName = json.companyName;
	var dbLink = json.databaseLink;
	
	store.dispatch(requestCompanyRegistration())
	return
	{
		request
		.post('url1')
		.send({
			company: companyName,
			databaseLink: dbLink
		})
		.then(function(err) {
				store.dispatch(receiveCompanyRegistration(false, err)
			},
			function(res){
				store.dispatch(receiveCompanyRegistration(true, res)
				store.dispatch(userRegistration(json));
			}
		)
	}
}