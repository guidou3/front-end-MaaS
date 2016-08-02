export function requestSaveTextDSLI() {
	return { type: waitingSaveTextDSLI }
}

export function receiveSaveTextDSLI(bool, text) {
	if(bool) return { 
		type: successSaveTextDSLI,
		new_text: text
	}
	else return { 
		type: failedSaveTextDSLI,
		error: text
		}
}

export function saveTextDSLI(new_text) {
	
	store.dispatch(requestSaveTextDSLI())
	return
	{
		request
		.put('url1')
		.send({
			text: new_text
		})
		.then(function(err) {
				store.dispatch(receiveSaveTextDSLI(false, err)
			},
			function(){
				store.dispatch(receiveUserRegistration(true, new_text) //il reducer deve modificare state.currentDSLI.DSLI
			}
		)
	}
}