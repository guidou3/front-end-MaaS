export default function dataListReducer(state = 0, action) {
	switch(action.type) {
		case 'getDatabase':
			console.log(action);
			return action.listData

		case 'embodyUser':
		case 'logout':
			return 0

		default:
			return state
	}
}
