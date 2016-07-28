import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
		count: counterReducer,
		companies : companiesReducer,
		auth : authReducer,
		sys : systemReducer,
		routing: routerReducer
	})


export default function counterReducer(state = 0, action) {
	switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
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
