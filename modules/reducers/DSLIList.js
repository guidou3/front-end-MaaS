export default function DSLIListReducer(state = 0, action) {
	switch(action.type) {
    case 'successLogin':
		  return action.user.DSLIList
		default:
			return state
	}
}
