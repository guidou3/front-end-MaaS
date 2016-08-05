export default function cloneDSLIReducer(state = 0, action) {
	switch(action.type) {
		case 'waitingCloneDSLI':
			return Object.assign({}, state, {
				loading: true,
				waitingFor: 'cloneDSLI'
			})
		case 'successCloneDSLI':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					result: 'success',
					error: null
			})
		case 'failedCloneDSLI':
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
