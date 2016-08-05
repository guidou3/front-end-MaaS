export function requestChangeDSLIPermits() {
	return { type: waitingChangeDSLIPermits }
}

export function receiveChangeDSLIPermits(bool, text) {
	if(bool) return {
		type: successChangeDSLIPermits,
		newLevel: text
	}
	else return {
		type: failedChangeDSLIPermits,
		error: text
		}
}

export function changeDSLIPermits(newLevel) {

	store.dispatch(requestChangeDSLIPermits())
	return
	{
		request
		.put('url')
		.send({
			level: newLevel
		})
		.then(function(err) {
				store.dispatch(receiveChangeDSLIPermits(false, err))
			},
			function(){
				store.dispatch(receiveChangeDSLIPermits(true, newLevel)) //il reducer deve modificare state.currentDSLI.level
			}
		)
	}
}
