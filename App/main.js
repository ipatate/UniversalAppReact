import App from './App.jsx';
import React from 'react';
import routes from './Routes/Routes';
import { match, applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store/configureStore';
import showDevTools from  './showDevTools';

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
  // open popup devtool
  showDevTools(store);

});
