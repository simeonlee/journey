import React from 'react'
import { render } from 'react-dom'
import { App } from './components/App'
import { Router, Route, browserHistory} from 'react-router'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Router>
), document.getElementById('app'))

render(<App />, document.getElementById('app'))