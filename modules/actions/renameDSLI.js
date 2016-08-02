export function requestRenameDSLI() {
	return { type: waitingRenameDSLI }
}

export function receiveRenameDSLI(bool, text) {
	if(bool) return { type: successRenameDSLI }
	else return { 
		type: failedRenameDSLI,
		error: text
	}
}

export function renameDSLI(newName) {
	store.dispatch(requestRenameDSLI())
	return
	{
		request
		.put('url1')
		.send({
			name: newName
		})
		.then(
			function(error){
				store.dispatch(receiveRenameDSLI(false, error))
			},
			function(result){
				store.dispatch(receiveRenameDSLI(true))
			}
		)
	}
}