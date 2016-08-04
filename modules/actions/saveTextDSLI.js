export function requestSaveTextDSLI() {
	return { type: 'waitingSaveTextDSLI' }
}

export function receiveSaveTextDSLI(bool, text) {
	if(bool) return { 
		type: 'successSaveTextDSLI',
		newText: text
	}
	else return { 
		type: 'failedSaveTextDSLI',
		error: text
		}
}

export function saveTextDSLI(newText) {
	return function(dispatch){
		dispatch(requestSaveTextDSLI())
		/*return request
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
			)*/
		dispatch(receiveUserRegistration(true, newText))
	}
}