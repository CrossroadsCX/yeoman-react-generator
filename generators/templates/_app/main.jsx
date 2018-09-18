/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import { configureStore } from './modules/root';

import App from './modules/root/App';

const store = configureStore();

function render() {
  const rootElement = document.getElementById('root');

  // Set body margin to zero
  const bodyElement = document.getElementsByTagName('body')[0];
  bodyElement.style.margin = 0;

  const appComponent = (
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>
  );

  ReactDOM.render(appComponent, rootElement);
}

render();

if (module.hot) {
  module.hot.accept('modules/root/App', render);
}
