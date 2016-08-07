export default function currentUserReducer(state = 0, action) {
	switch(action.type) {
		case 'getUser':
			return action.selected
		default:
			return state
	}
}
