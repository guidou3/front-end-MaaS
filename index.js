import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Login from './modules/Login'
import SignIn from './modules/SignIn'
import Home from './modules/Home'
import Provider from './modules/Provider'
import counter from './modules/reducers/SignIn'

const store = createStore(counter)
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
