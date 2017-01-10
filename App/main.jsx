import React from 'react';
import { match, Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import routes from './Routes/routes';
import { configureStore } from './redux/store/configureStore';
import showDevTools from './showDevTools';

const history = browserHistory;
const store = configureStore(window.__INITIAL_STATE__);

document.addEventListener('DOMContentLoaded', () => {
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    render(
      <Provider store={store}>
        <Router {...renderProps} history={history} routes={routes} />
      </Provider>
      , document.getElementById('app'));
  });
  if (process.env.NODE_ENV !== 'production') {
    // open popup devtool
    showDevTools(store);
  }
});
