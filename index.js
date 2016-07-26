import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from 'react-router-redux'

import Header from './modules/containers/Header'
import Login from './modules/containers/Login'
import SignIn from './modules/containers/SignIn'
import List from './modules/components/List'
import Home from './modules/containers/Home'
import Provider from './modules/containers/Provider'
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
				<Route path="/" component={Header}>
					<IndexRoute component={Home}/>
					<Route path="/signIn" component={SignIn}/>
					<Route path="/login" component={Login}/>
					<Route path="/list" component={List}/>
				</Route>
			</Router>
		</Provider>,
		rootEl
  )
}

render()
store.subscribe(render)
