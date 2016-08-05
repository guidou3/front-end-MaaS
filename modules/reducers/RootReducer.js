import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import changeImageReducer from './changeImage'
import changePasswordReducer from './changePassword'
import cloneDSLIReducer from './cloneDSLI'
import companyRegistrationReducer from './companyRegistration'
import currentDSLIReducer from './currentDSLI'
import deleteDSLIReducer from './deleteDSLI'
import deleteUserReducer from './deleteUser'
import loggedUserReducer from './loggedUser'
import newDSLIReducer from './newDSLI'
import renameDSLIReducer from './renameDSLI'
import saveTextDSLIReducer from './saveTextDSLI'
import userRegistrationReducer from './userRegistration'

export default combineReducers({
		companies : companiesReducer,
		auth : authReducer,
		sys : systemReducer,
		routing: routerReducer,
		profile: infoReducer,
		loggedUser: loggedUserReducer,
		status: combineReducers({
			changeImageReducer,
			changePasswordReducer,
			cloneDSLIReducer,
			companyRegistrationReducer,
			deleteDSLIReducer,
			deleteUserReducer,
			newDSLIReducer,
			renameDSLIReducer,
			saveTextDSLIReducer,
			userRegistrationReducer
		})
	})

export default function authReducer(state = 0, action) {
	switch (action.type) {
    case 'AT':
      return 1
		case 'AL':
		  return 0
    default:
      return state
  }
}

export default function systemReducer(state = '', action) {
	switch (action.type) {
    case 'ERR':
      return action.err
    default:
      return ''
  }
}

export default function infoReducer(state = '', action) {
		switch (action.type) {
	    case 'REQUESTED_PROFILE':
	      return action.value
	    default:
	      return state
	  }
}

export default function companiesReducer(state = 0, action) {
	switch (action.type) {
    case 'RECEIVED_COMPANIES':
      return action.companies
    default:
      return state
  }
}
