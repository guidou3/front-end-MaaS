export default function loggedUserReducer(state = 0, action) {
	switch(action.type) {
				case 'successChangeImage':
			return Object.assign({}, state, {
					image: action.image
			})
		default:
			return state
	}
}
