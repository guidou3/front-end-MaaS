/*
 * Name : index.js
 * Module : Front-end::index
 * Location : /model/
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1           2016-08-03     D'Amico Roberto
 * -------------------------------------------------
 * Codifica iniziale
 * =================================================
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

import Header from './modules/containers/Header'
import Login from './modules/containers/Login'
import SignUp from './modules/containers/SignUp'
import RePwd from './modules/containers/RecoverPassword'
import Contact from './modules/containers/ContactSupport'
import Profile from './modules/containers/Profile'
import EditDSLI from './modules/containers/Editor'
import MainPage from './modules/containers/MainPage'
import HomePage from './modules/containers/HomePage'
import HomeDeveloper from './modules/containers/HomeDeveloper'
import MnUser from './modules/containers/UserManagement'
import MnDSLI from './modules/containers/DSLIManagement'
import MnPvtDSLI from './modules/containers/DSLIPrivateManagement'
import MnData from './modules/containers/DataManagement'
import Provider from './modules/containers/Provider'
import rootReducer from './modules/reducers/RootReducer'
import Loading from './modules/containers/Loading'

import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist'

const api = 'https://maas-demo.herokuapp.com/api/'
//const api = 'http://0.0.0.0:3000/api/'
const goto = routerMiddleware(browserHistory)
const logger = createLogger()
const store = createStore(
		rootReducer,
		applyMiddleware(goto, logger, thunk.withExtraArgument(api)),
		autoRehydrate()
)
persistStore(store).purge(['routing'])

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const rootEl = document.getElementById('app')

const routes =
	<Route path="/" component={Header}>
		<IndexRoute component={MainPage}/>
		<Route path="/home" component={HomePage}/>
		<Route path="/homeDeveloper" component={HomeDeveloper}/>
		<Route path="/signUp" component={SignUp}/>
		<Route path="/login" component={Login}/>
		<Route path="/repwd" component={RePwd}/>
		<Route path="/profile" component={Profile}/>
		<Route path="/support" component={Contact}/>
		<Route path="/manageuser" component={MnUser}/>
		<Route path="/managedsli" component={MnDSLI}/>
		<Route path="/managepvtdsli" component={MnPvtDSLI}/>
		<Route path="/managedata" component={MnData}/>
		<Route path="/editdsli" component={EditDSLI}/>
		<Route path="/execdsli" component={Loading}/> /*PageBuilder  */
	</Route>;

function render() {
	ReactDOM.render(
		<Provider store = {store}>
			<Router history = {history}>
				{routes}
			</Router>
		</Provider>,
		rootEl
  )
}

render()
store.subscribe(render)
