export function requestNewDSLI() {
	return { type: waitingNewDSLI }
}

export function receiveNewDSLI(bool, text) {
	if(bool) return { type: successNewDSLI }
	else return { 
		type: failedNewDSLI,
		error: text
	}
}

export function newDSLI(json) {
	store.dispatch(requestNewDSLI())
	return
	{
		request
		.post('url1')
		.send({
			name: json.name,
			DSLI: json.DSLI
		})
		.then(
			function(error){
				store.dispatch(receiveNewDSLI(false, error))
			},
			function(result){
				store.dispatch(receiveNewDSLI(true))
			}
		)
	}
}