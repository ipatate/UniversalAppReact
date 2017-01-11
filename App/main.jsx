import React from 'react';
import { match, Router, applyRouterMiddleware, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { useScroll } from 'react-router-scroll';
// i18next
import { I18nextProvider } from 'react-i18next';
import routes from './Routes/routes';
import { configureStore } from './redux/store/configureStore';
import initLang from './lib/i18n';

require('es6-promise').polyfill();

const history = browserHistory;
const store = configureStore(window.__INITIAL_STATE__);
let rootInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  return initLang().then((i18n) => {
    match({ history, routes }, (error, redirectLocation, renderProps) => {
      const changeLanguage = (lg) => { i18n.changeLanguage(lg); };
      function createWithDefaultProps(Component, props) {
        return <Component {...props} changeLanguage={changeLanguage} />;
      }
      rootInstance = render(
        <I18nextProvider t={i18n.t} i18n={i18n}>
          <Provider store={store}>
            <Router
              {...renderProps}
              history={history}
              routes={routes}
              render={applyRouterMiddleware(useScroll())}
              createElement={createWithDefaultProps}
            />
          </Provider>
        </I18nextProvider>
        , document.getElementById('app'));
    });
    if (process.env.NODE_ENV !== 'production') {
      require('../public/css/app.scss'); // eslint-disabled-line
      // open popup devtool
      if (process.env.DEV_TOOLS) {
        const showDevTools = require('./lib/showDevTools').default; // eslint-disabled-line
        showDevTools(store);
      }
    }
  });
});
