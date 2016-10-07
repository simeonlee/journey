import React from 'react'
import { render } from 'react-dom'
// import { App } from './components/App'
// import { Router, Route, browserHistory, IndexRoute } from 'react-router'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import Journal from './components/journal/Journal'
// import Dashboard from './components/Dashboard'
// import { Profile } from './components/Profile'
// import { Home } from './components/Home'
// import { LoginModal } from './components/LoginModal'
// import { authenticateUser, checkIfLoggedIn } from './utils'

import 'babel-polyfill'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'

// import Root from './root';
// import '!style!css!sass!../client/styles/scss/main.scss'

const rootElement = document.getElementById('app');

render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootElement,
)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;

    render(
      <AppContainer>
         <NextApp />
      </AppContainer>,
      rootElement,
    );
  });
}