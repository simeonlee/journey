import React from 'react'
import { render } from 'react-dom'
import { App } from './components/App'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { Journal } from './components/Journal'
import { Dashboard } from './components/Dashboard'
import { Profile } from './components/Profile'
import { SignIn } from './components/SignIn'
import { Home } from './components/Home'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="journal" component={Journal}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/signin" component={SignIn}/>
    </Route>
  </Router>
), document.getElementById('app'))