export function requestDeleteDSLI() {
	return { type: waitingDeleteDSLI }
}

export function receiveDeleteDSLI(bool, text) {
	if(bool) return { type: successDeleteDSLI }
	else return { 
		type: failedDeleteDSLI,
		error: text
	}
}

export function deleteDSLI() {
	store.dispatch(requestDeleteDSLI())
	return
	{
		request
		.del('url1')
		.then(
			function(error){
				store.dispatch(receiveDeleteDSLI(false, error))
			},
			function(result){
				store.dispatch(receiveDeleteDSLI(true))
			}
		)
	}
}