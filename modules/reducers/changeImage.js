export default function changeImageReducer(state = 0, action) {
	switch(action.type) {
		case 'waitingChangeImage':
			return Object.assign({}, state, {
				status.loading = true,
				status.waitingFor = 'changeImage'
			})
		case 'successChangeImage':
			return Object.assign({}, state, {
				loggedUser:
				{
					...loggedUser,
					image: action.image
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
		case 'failedChangeImage':
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