export function requestChangePassword() {
	return { type: 'waitingChangePassword' }
}

export function receiveChangePassword(bool, text) {
	if(bool) return { type: 'successChangePassword' }
	else return { 
		type: 'failedChangePassword',
		error: text
	}
}

export function changePassword(newPassword) {
	return function(dispatch){
		dispatch(requestChangePassword())
		/*return request
			.put('url1')
			.send({
				password: newPassword
			})
			.then(
				function(){
					dispatch(receiveChangePassword(true))
				},
				function(error){
					dispatch(receiveChangePassword(false, error))
				}
			)*/
		dispatch(receiveChangePassword(true))
	}
}