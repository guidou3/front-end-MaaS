export function requestNewDSLI() {
	return {
		type: 'waiting',
		operation: 'newDSLI'
	}
}

export function receiveNewDSLI(bool, data) {
	if(bool) return {
		type: 'newDSLI',
		DSLI: data
	}
	else return {
		type: 'error',
		error: data
	}
}

export function newDSLI(data) {
	return function(dispatch){
		dispatch(requestNewDSLI())
		return request
			.post('url1')
			.send({
				name: data.name,
				code: data.DSLI
			})
			.then(
				function(result){
					dispatch(receiveNewDSLI(true, result))
					dispatch(push('...')) //indirizzo destinazione
				},
				function(error){
					dispatch(receiveNewDSLI(false, error))
				}
			)
	}
}
