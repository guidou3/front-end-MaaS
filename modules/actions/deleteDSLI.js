export function requestDeleteDSLI() {
	return { type: 'waitingDeleteDSLI' }
}

export function receiveDeleteDSLI(bool, text) {
	if(bool) return { type: 'successDeleteDSLI' }
	else return { 
		type: 'failedDeleteDSLI',
		error: text
	}
}

export function deleteDSLI() {
	return function(dispatch){
		dispatch(requestDeleteDSLI())
		/*return request
			.del('url1')
			.then(
				function(){
					dispatch(receiveDeleteDSLI(true))
				},
				function(error){
					dispatch(receiveDeleteDSLI(false, error))
				}
			)*/
		dispatch(receiveDeleteDSLI(true))
	}
}