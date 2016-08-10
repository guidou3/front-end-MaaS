export function requestDSLIList() {
	return {
		type: 'waiting',
		operation: 'getDSLIList'
	}
}

export function receiveDSLIList(bool, data) {
	if(bool) return {
		type: 'getDSLIList',
		listDSLI: data //lista
	}
	else return {
		type: 'error',
		error: data
	}
}

export function getDSLIList() {
	return function(dispatch){
		dispatch(requestDSLIList())
		return request
			.get('url1')
			.then(
				function(result){
					dispatch(receiveDSLIList(true, result))
				},
				function(error){
					dispatch(receiveDSLIList(false, error))
				}
			)
	}
}
