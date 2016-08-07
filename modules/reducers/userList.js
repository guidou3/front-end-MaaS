export default function userListReducer(state = 0, action) {
	switch(action.type) {
    case 'userList':
		  return action.userList
		default:
			return state
	}
}
