export function requestAddDatabase() {
	return {
		type: 'waiting',
		operation: 'addDatabase'
	}
}

export function receiveAddDatabase(bool, data) {
	if(bool) return {
		type: 'addDatabase'
		}
	else return {
		type: 'error',
		error: data
		}
}

export function addDatabase(id, data) {
	return function(dispatch){
		dispatch(requestAddDatabase())
		return request
			.post('url1')
			.send({
				databaseLink: data
			})
			.then(function() {
					dispatch(receiveAddDatabase(true))
				},
				function(err){
					dispatch(receiveAddDatabase(false, err))
				}
			)
	}
}
