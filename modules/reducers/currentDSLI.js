/*
* Name : currentDSLI.js
* Location : ./modules/reducers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-30     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
export default function currentDSLIReducer(state = 0, action) {
	switch(action.type) {

		case 'setDSLI':
		case 'getDSLI':
			return {
				id: action.dsli.id,
				name: action.dsli.name,
				code: action.dsli.DSLcode,
				lastModifiedDate: action.dsli.lastModifiedDate,
				permits: action.dsli.permits,
				databaseId: action.dsli.databaseId
			}
		case 'execDSLI':
			return Object.assign({}, state, {
					result: action.result
			})

		case 'embodyUser':
		case 'logout':
			return 0
		default:
			return state
	}
}

/*case 'newDSLI':
	return {
		id: action.DSLI.id, // o faccio una query per ottenere l'id oppure uso getDSLI
		name: action.DSLI.name,
		code: action.DSLI.code,
		permit: action.DSLI.permit
	}
case 'cloneDSLI':
	return {
		id: action.DSLI.id,
		name: action.DSLI.name,
		code: action.DSLI.code,
		permit: action.DSLI.permit
	}*/

	/*case 'renameDSLI':
		return Object.assign({}, state, {
				name: action.newName
		})
	case 'saveTextDSLI':
		return Object.assign({}, state, {
				code: action.newText
		})*/
