export function requestChangePassword() {
	return { type: waitingChangePassword }
}

export function receiveChangePassword(bool, text) {
	if(bool) return { type: successChangePassword }
	else return { 
		type: failedChangePassword,
		error: text
	}
}

export function changePassword(newPassword) {
	store.dispatch(requestChangePassword())
	return
	{
		request
		.put('url1')
		.send({
			password: newPassword
		})
		.then(
			function(error){
				store.dispatch(receiveChangePassword(false, error))
			},
			function(result){
				store.dispatch(receiveChangePassword(true))
			}
		)
	}
}