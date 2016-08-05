export default function changePasswordReducer(state = 0, action) {
	switch(action.type) {
		case 'waitingChangePassword':
			return Object.assign({}, state, {
				loading: true,
				waitingFor: 'changePassword'
			})
		case 'successChangePassword':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					result: 'success',
					error: null
			})
		case 'failedChangePassword':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					result: 'error',
					error: action.error
			})
		default:
			return state;
	}
}
