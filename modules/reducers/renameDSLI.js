export default function renameDSLIReducer(state = 0, action) {
	switch(action.type) {
		case 'waitingRenameDSLI':
			return Object.assign({}, state, {
				loading: true,
				waitingFor: 'renameDSLI'
			})
		case 'successRenameDSLI':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					result: 'success',
					error: null
			})
		case 'failedRenameDSLI':
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
