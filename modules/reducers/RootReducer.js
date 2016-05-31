import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
		count: counterReducer,
		companies : companiesReducer,
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
    case 'UPDATE_COMPANIES':
      return action.companies
    default:
      return state
  }
}
