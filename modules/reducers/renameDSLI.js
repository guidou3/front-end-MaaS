export default function renameDSLIReducer(state = 0, action) {
	switch(action.type) {
		case 'waitingRenameDSLI':
			return Object.assign({}, state, {
				status.loading = true,
				status.waitingFor = 'renameDSLI'
			})
		case 'successRenameDSLI':
			return Object.assign({}, state, {
				currentDSLI
				{
					...currentDSLI,
					name: action.newName
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
		case 'failedRenameDSLI':
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