export function requestDeleteDSLI() {
	return {
		type: 'waiting',
		operation: 'deleteDSLI'
	}
}

export function receiveDeleteDSLI(bool, text) {
	if(bool) return { type: 'deleteDSLI' }
	else return {
		type: 'error',
		error: text
	}
}

export function deleteDSLI() {
	return function(dispatch){
		dispatch(requestDeleteDSLI())
		return request
			.del('url1')
			.then(
				function(){
					dispatch(receiveDeleteDSLI(true))
				},
				function(error){
					dispatch(receiveDeleteDSLI(false, error))
				}
			)
	}
}
