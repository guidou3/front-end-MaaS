export default function deleteUserReducer(state = 0, action) {
	switch(action.type) {
		case 'waitingDeleteUser':
			return Object.assign({}, state, {
				loading: true,
				waitingFor: 'deleteUser'
			})
		case 'successDeleteUser':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					result: 'success',
					error: null
			})
		case 'failedDeleteUser':
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
