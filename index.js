import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from 'react-router-redux'

import App from './modules/components/App'
import Login from './modules/components/Login'
import SignIn from './modules/components/SignIn'
import Companies from './modules/components/Companies'
import Home from './modules/components/Home'
import Provider from './modules/components/Provider'
import rootReducer from './modules/reducers/RootReducer'

import createLogger from 'redux-logger'

const goto = routerMiddleware(browserHistory)
const logger = createLogger()
const store = createStore(
		rootReducer,
		applyMiddleware(goto, logger)
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const rootEl = document.getElementById('app')

function render() {
	ReactDOM.render(
		<Provider store = {store}>
			<Router history={history}>
				<Route path="/" component={App}>
					<IndexRoute component={Home}/>
					<Route path="/signIn" component={SignIn}/>
					<Route path="/login" component={Login}/>
					<Route path="/companies" component={Companies}/>
				</Route>
			</Router>
		</Provider>,
		rootEl
  )
}

render()
store.subscribe(render)
