import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export default function rootReducer(state = 0, action) {
	combineReducers({
		basicReducer,
		routing: routerReducer
	})
	
}

export default function basicReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
