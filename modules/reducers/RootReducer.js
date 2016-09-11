/*
* Name :  RootReducers.js
* Location : ./modules/reducers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-07-27    Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
* 0.2.0           2016-08-15    Guido Santi
* -------------------------------------------------
* Modifica del modulo
* =================================================
*/
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import loggedUserReducer from './loggedUser'
import DSLIListReducer from './DSLIList'
import userListReducer from './userList'
import dataListReducer from './dataList'
import currentDSLIReducer from './currentDSLI'
import currentUserReducer from './currentUser'
import statusReducer from './statusReducer'

export default combineReducers({
	loggedUser: loggedUserReducer,
	DSLIList: DSLIListReducer,
	userList: userListReducer,
	dataList: dataListReducer,
	currentDSLI: currentDSLIReducer,
	currentUser: currentUserReducer,
	status: statusReducer,
	routing: routerReducer
})
