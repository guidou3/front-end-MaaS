export function requestSaveTextDSLI() {
	return {
		type: 'waiting',
		operation: 'saveTextDSLI'
	}
}

export function receiveSaveTextDSLI(bool, text) {
	if(bool) return {
		type: 'saveTextDSLI',
		newText: text
	}
	else return {
		type: 'error',
		error: text
		}
}

export function saveTextDSLI(newText) {
	return function(dispatch){
		dispatch(requestSaveTextDSLI())
		return request
			.put('url1')
			.send({
				text: newText
			})
			.then(function() {
					dispatch(receiveUserRegistration(true, newText)) //il reducer deve modificare state.currentDSLI.DSLI
				},
				function(err){
					dispatch(receiveSaveTextDSLI(false, err))
				}
			)
	}
}
