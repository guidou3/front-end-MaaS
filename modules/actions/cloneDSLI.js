export function requestCloneDSLI() {
	return { type: waitingCloneDSLI }
}

export function receiveCloneDSLI(bool, text) {
	if(bool) return { type: successCloneDSLI }
	else return { 
		type: failedCloneDSLI,
		error: text
	}
}

export function cloneDSLI(newName) {
	store.dispatch(requestCloneDSLI())
	return
	{
		request
		.post('url1')
		.send({
			name: newName,
			DSLI: this.currentDSLI.DSLI
		})
		.then(
			function(error){
				store.dispatch(receiveCloneDSLI(false, error))
			},
			function(result){
				store.dispatch(receiveCloneDSLI(true))
			}
		)
	}
}