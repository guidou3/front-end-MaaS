import request from 'superagent'

function requestExec() {
	return {
		type: 'waiting',
		operation: 'execDSLI'
	}
}

function receiveExec(bool, data) {
	if(bool) return {
		type: 'execDSLI',
		result: data
	}
	else return {
		type: 'error',
		error: data
	}
}

export function execDSLI(id, data) {
	return function(dispatch, getState, api){
		dispatch(requestExec())
		console.log("EXEC");
		return request
			.post(api + 'dsl/'+id+'/execute?access_token='+getState().loggedUser.token)
      .send({query: data})
			.then(
				function(result){
					let res = JSON.parse(result.text)
					console.log("RESULT");
					console.log(res);
					dispatch(receiveExec(true, res))
				},
				function(error){
					dispatch(receiveExec(false, error))
				}
			)
	}
}
