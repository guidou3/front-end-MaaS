import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import companiesReducer from './companyRegistration'

export default combineReducers({
		companies : companiesReducer,
		auth : authReducer,
		sys : systemReducer,
		routing: routerReducer,
		profile: infoReducer
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
