export default function userListReducer(state = 0, action) {
	switch(action.type) {
    case 'getUserList':
		  return action.userList
		case 'embodyUser':
		case 'logout':
			return 0
		default:
			return state
	}
}
