import React from 'react'
import { render } from 'react-dom'
import { App } from './components/App'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Journal from './components/journal/Journal'
import Dashboard from './components/Dashboard'
import { Profile } from './components/Profile'
import { SignIn } from './components/SignIn'
import { Home } from './components/Home'
import { LoginModal } from './components/LoginModal'
import { authenticateUser, checkIfLoggedIn } from './utils'



render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} onEnter={checkIfLoggedIn}/>
      <Route path="/journal" component={Journal} onEnter={authenticateUser}/>
      <Route path="/dashboard" component={Dashboard} onEnter={authenticateUser}/>
      <Route path="/profile" component={Profile} onEnter={authenticateUser}/>
    </Route>
  </Router>
), document.getElementById('app'))