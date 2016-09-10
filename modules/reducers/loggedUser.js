/*
* Name : loggedUser.js
* Location : ./modules/reducers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-15     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
export default function loggedUserReducer(state = 0, action) {
	switch(action.type) {
		case 'login':
		case 'embodyUser':
			return {
				account: action.user.account,
				accessLevel: action.user.accessLevel,
				company: action.user.company,
				token: action.user.token
			}
		case 'changeAccessLevel':
			return Object.assign({}, state, {
				accessLevel: action.newLevel
			})
		case 'logout':
			return 0
		default:
			return state
	}
}
