export function requestRenameDSLI() {
	return {
		type: 'waiting',
		operation: 'renameDSLI'
	}
}

export function receiveRenameDSLI(bool, text) {
	if(bool) return {
		type: 'successRenameDSLI',
		newName: text
	}
	else return {
		type: 'failedRenameDSLI',
		error: text
	}
}

export function renameDSLI(newName) {
	return function(dispatch){
		dispatch(requestRenameDSLI())
		/*return request
			.put('url1')
			.send({
				name: newName
			})
			.then(
				function(){
					dispatch(receiveRenameDSLI(true, newName))
				},
				function(error){
					dispatch(receiveRenameDSLI(false, error))
				}
			)*/
		dispatch(receiveRenameDSLI(true, newName))
	}
}
