export default function deleteDSLIReducer(state = 0, action) {
	switch(action.type) {
		case 'waitingDeleteDSLI':
			return Object.assign({}, state, {
				status.loading = true,
				status.waitingFor = 'deleteDSLI'
			})
		case 'successDeleteDSLI':
			return Object.assign({}, state, {
				//deseleziona DSLI corrente
				status: 
				{
					...status,
					loading: false,
					waitingFor: null,
					result: 'success',
					error: null
				}
			})
		case 'failedDeleteDSLI':
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