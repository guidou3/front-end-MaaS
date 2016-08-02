export function requestDeleteUser() {
	return { type: waitingDeleteUser }
}

export function receiveDeleteUser(bool, text) {
	if(bool) return { type: successDeleteUser }
	else return { 
		type: failedDeleteUser,
		error: text
	}
}

export function deleteUser() {
	store.dispatch(requestDeleteUser())
	var url;
	if(state.loggedUser.livelloAccesso == 'admin')
	{
		url = ...
	}
	else
	{
		url = ...
	}
	return
	{
		request
		.del(url)
		.then(
			function(error){
				store.dispatch(receiveDeleteUser(false, error))
			},
			function(result){
				if(state.loggedUser.livelloAccesso != 'admin')
				{
					//action per effettuare il logout
				}
				store.dispatch(receiveDeleteUser(true))
			}
		)
	}
}