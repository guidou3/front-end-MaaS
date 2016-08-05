export default function currentDSLIReducer(state = 0, action) {
	switch(action.type) {
		case 'successRenameDSLI':
			return Object.assign({}, state, {
					name: action.newName
			})
		case 'successSaveTextDSLI':
			return Object.assign({}, state, {
					code: action.newText
			})
		default:
			return state
	}
}
