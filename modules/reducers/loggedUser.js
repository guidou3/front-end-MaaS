export default function loggedUserReducer(state = 0, action) {
	switch(action.type) {
		case 'successChangeImage':
			return Object.assign({}, state, {
					image: action.image
			})
		case 'successLogin':
			return Object.assign({}, state, {
				username: action.user.username,
				accessLevel: action.user.accessLevel,
				image: action.user.image
			})
		case 'logout':
			return 0
		default:
			return state
	}
}
