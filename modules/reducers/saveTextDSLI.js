export default function saveTextDSLIReducer(state = 0, action) {
	switch(action.type) {
		case 'waitingSaveTextDSLI':
			return Object.assign({}, state, {
				loading: true,
				waitingFor: 'saveTextDSLI'
			})
		case 'successSaveTextDSLI':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					result: 'success',
					error: null
			})
		case 'failedSaveTextDSLI':
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