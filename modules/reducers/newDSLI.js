export default function newDSLIReducer(state = 0, action) {
	switch(action.type) {
		case 'waitingNewDSLI':
			return Object.assign({}, state, {
				loading: true,
				waitingFor: 'newDSLI'
			})
		case 'successNewDSLI':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					result: 'success',
					error: null
			})
		case 'failedNewDSLI':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					result: 'error',
					error: action.error
			})
		default:
			return state
	}
}
