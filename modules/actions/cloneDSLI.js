export function requestCloneDSLI() {
	return { type: 'waitingCloneDSLI' }
}

export function receiveCloneDSLI(bool, text) {
	if(bool) return { type: 'successCloneDSLI' }
	else return {
		type: 'failedCloneDSLI',
		error: text
	}
}

export function cloneDSLI(newName) {
	return function(dispatch){
		dispatch(requestCloneDSLI())
		/*return request
			.post('url1')
			.send({
				name: newName,
				DSLI: this.currentDSLI.DSLI
			})
			.then(
				function(){
					dispatch(receiveCloneDSLI(true))
				},
				function(error){
					dispatch(receiveCloneDSLI(false, error))
				}
			)*/
		dispatch(receiveCloneDSLI(true))
	}
}
