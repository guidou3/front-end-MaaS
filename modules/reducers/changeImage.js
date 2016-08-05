export default function changeImageReducer(state = 0, action) {
	switch(action.type) {
		case 'waitingChangeImage':
			return Object.assign({}, state, {
				loading: true,
				waitingFor: 'changeImage'
			})
		case 'successChangeImage':
			return Object.assign({}, state, {
					loading: false,
					waitingFor: null,
					result: 'success',
					error: null
			})
		case 'failedChangeImage':
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
