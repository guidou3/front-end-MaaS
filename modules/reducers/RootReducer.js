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
	routing: routerReducer,
	})
