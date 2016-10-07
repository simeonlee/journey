import React from 'react'
import { render } from 'react-dom'

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