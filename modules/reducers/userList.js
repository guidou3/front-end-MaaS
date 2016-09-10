/*
* Name : userList.js
* Location : ./modules/reducers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-14     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
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
