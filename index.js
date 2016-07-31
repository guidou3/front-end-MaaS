import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from 'react-router-redux'

import Header from './modules/containers/Header'
import Login from './modules/containers/Login'
import SignIn from './modules/containers/SignIn'
import ReAcc from './modules/containers/RecoverAccount'
import RePwd from './modules/containers/RecoverPassword'
import ChangePwd from './modules/containers/ResetPassword'
import List from './modules/components/List'
import Profile from './modules/containers/Profile'
import MainPage from './modules/containers/MainPage'
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

const routes =
	<Route path="/" component={Header}>
		<IndexRoute component={MainPage}/>
		<Route path="/signIn" component={SignIn}/>
		<Route path="/login" component={Login}/>
		<Route path="/login/reacc" component={ReAcc}/>
		<Route path="/login/repwd" component={RePwd}/>
		<Route path="/list" component={List}/>
		<Route path="/profile" component={Profile}/>
		<Route path="/profile/changepwd" component={ChangePwd}/>
	</Route>;

function render() {
	ReactDOM.render(
		<Provider store = {store}>
			<Router history={history}>
				{routes}
			</Router>
		</Provider>,
		rootEl
  )
}

render()
store.subscribe(render)
