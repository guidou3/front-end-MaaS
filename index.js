import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from 'react-router-redux'

import App from './modules/components/App'
import Login from './modules/components/Login'
import SignIn from './modules/components/SignIn'
import Home from './modules/components/Home'
import Provider from './modules/components/Provider'
import reducer from './modules/reducers/RootReducer'

import createLogger from 'redux-logger'

const goto = routerMiddleware(browserHistory)
const logger = createLogger()
const store = createStore(
	reducer,
	applyMiddleware(goto, logger)
)


const rootEl = document.getElementById('app')

function render() {
	ReactDOM.render(
		<Provider store = {store}>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Home}/>
					<Route path="/signIn" component={SignIn}/>
					<Route path="/login" component={Login}/>
				</Route>
			</Router>
		</Provider>,
		rootEl
  )
}

render()
store.subscribe(render)
