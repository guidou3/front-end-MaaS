export function requestCheckUsername() {
	return { type: waitingCheckUsername }
}

export function receiveCheckUsername(bool) {
	if(bool) return { type: successCheckUsername }
	else return { type: failedCheckUsername }
}

export function checkUsername(json) {
	var user = json.user;
	if(user == null)
	{
		//errore
	}
	else
	{
		store.dispatch(requestCheckUsername())
		return
		{
			request
			.get('url2')
			.query({username: user})
			.then(
				function(error){
					store.dispatch(receiveCheckUsername(true))
				},
				function(result){
					store.dispatch(receiveCheckUsername(false))
				}
			)
		}
	}
}

export function requestUserRegistration() {
	return { type: waitingUserRegistration }
}

export function receiveUserRegistration(bool, text) {
	if(bool) return { type: successUserRegistration }
	else return { 
		type: failedUserRegistration,
		error: text
		}
}

export function userRegistration(json) {
	var user = json.user;
	var pw = json.password;
	
	store.dispatch(requestUserRegistration())
	return
	{
		request
		.post('url1')
		.send({
			username: user,
			password: pw
		})
		.then(function(err) {
				store.dispatch(receiveUserRegistration(false, err)
			},
			function(res){
				store.dispatch(receiveUserRegistration(true, res)
			}
		)
	}
}