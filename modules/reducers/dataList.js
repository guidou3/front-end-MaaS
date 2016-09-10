/*
* Name : dataList.js
* Location : ./modules/reducers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-18     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
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
