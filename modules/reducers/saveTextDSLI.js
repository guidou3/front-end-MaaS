export default function saveTextDSLIReducer(state = 0, action) {
	switch(action.type) {
		case 'waitingSaveTextDSLI':
			return Object.assign({}, state, {
				status.loading = true,
				status.waitingFor = 'saveTextDSLI'
			})
		case 'successSaveTextDSLI':
			return Object.assign({}, state, {
				currentDSLI
				{
					...currentDSLI,
					DSLI: action.newText
				}
				status: 
				{
					...status,
					loading: false,
					waitingFor: null,
					result: 'success',
					error: null
				}
			})
		case 'failedSaveTextDSLI':
			return Object.assign({}, state, {
				status: 
				{
					...status,
					loading: false,
					waitingFor: null,
					result: 'error',
					error: action.error
				}
			})
		default:
			return state
	}
}