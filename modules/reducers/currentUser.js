/*
* Name : currentUser.js
* Location : ./modules/reducers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-17     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
export default function currentUserReducer(state = 0, action) {
	switch(action.type) {
		case 'getUser':
			return action.selected

		case 'embodyUser':
		case 'logout':
			return 0

		default:
			return state
	}
}
