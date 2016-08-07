export function requestDSLIList() {
	return {
		type: 'waiting',
		operation: 'getDSLI'
	}
}

export function receiveDSLIList(bool, data) {
	if(bool) return {
		type: 'getDSLI',
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
		/*return request
			.get('url1')
			.then(
				function(result){
					dispatch(receiveDSLI(true, result))
				},
				function(error){
					dispatch(receiveDSLI(false, error))
				}
			)*/
		dispatch(receiveDSLIList(true, [
      {
        id: 'adseosgbossur',
        name: 'primo'
      },
      {
        id: 'adsdgvrdgbour',
        name: 'secondo'
      },
      {
        id: 'fiaeyesiufour',
        name: 'terzo'
      },
      {
        id: 'adsdgvuosfeho',
        name: 'quarto'
      }
    ]))
	}
}
