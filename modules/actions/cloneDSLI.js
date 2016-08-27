import {newDSLI} from './newDSLI'
import {getDSLIList} from './getDSLIList'

export function cloneDSLI(dsli, level =0) {
	return function(dispatch){
		let publicc = false;
		if(level > 0) publicc = true
		let n = Object.assign({}, dsli, {name:"Clone of "+ dsli.name, public: publicc, permits: level})
		console.log(n)
		dispatch(newDSLI(n)).then(() => (dispatch(getDSLIList())))
	}
/*
export function requestCloneDSLI() {
	return {
		type: 'waiting',
		operation: 'cloneDSLI'
	}
}

export function receiveCloneDSLI(bool, data) {
	if(bool) return {
		type: 'cloneDSLI',
		DSLI: data
	}
	else return {
		type: 'error',
		error: data
	}
}

export function cloneDSLI(newName) {
	return function(dispatch){
		dispatch(requestCloneDSLI())
		return request
			.post('url1')
			.send({
				name: newName,
				code: state.currentDSLI.code //non credo sia proprio così
			})
			.then(
				function(result){
					dispatch(receiveCloneDSLI(true, result))
				},
				function(error){
					dispatch(receiveCloneDSLI(false, error))
				}
			)
	}
*/
}
