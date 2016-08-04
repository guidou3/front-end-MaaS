export function requestNewDSLI() {
	return { type: 'waitingNewDSLI' }
}

export function receiveNewDSLI(bool, text) {
	if(bool) return { type: 'successNewDSLI' }
	else return { 
		type: 'failedNewDSLI',
		error: text
	}
}

export function newDSLI(json) {
	return function(dispatch){
		dispatch(requestNewDSLI())
		/*return request
			.post('url1')
			.send({
				name: json.name,
				DSLI: json.DSLI
			})
			.then(
				function(){
					dispatch(receiveNewDSLI(true))
				},
				function(error){
					dispatch(receiveNewDSLI(false, error))
				}
			)*/
		dispatch(receiveNewDSLI(true))
	}
}