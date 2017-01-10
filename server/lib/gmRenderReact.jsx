// React
import React from 'react';
// use for render react from server
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
// redux
import { Provider } from 'react-redux';
// i18next
import { I18nextProvider } from 'react-i18next';
import initLang from '../../App/lib/i18n';
// redux
import { configureStore } from '../../App/redux/store/configureStore';

// method for init state from component
import { gmInitAppData } from './gmInitAppData';
// the shared route
import routes from '../../App/Routes/routes';


const gmRenderReact = (req, res, next) => {
  return match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    // if not route found in router return next for display error 404 or other node page if exist
    if (!renderProps) {
      return next();
    }
    // init the store
    const store = configureStore({});
    return initLang()
    .then((i18n) => {
    // fetch all func for init the children components
      return gmInitAppData(store.dispatch, renderProps).then(() => {
        let initialView = '';
        // render the string with react component mounted
        try {
          initialView = renderToString(
            <I18nextProvider i18n={i18n}>
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            </I18nextProvider>
          );
        } catch (error) {
          // throw error;
          // console.log(error);
        }

        const finalState = store.getState();
        return res.render('main', { reactOutput: initialView, initialState: JSON.stringify(finalState) });
      });
    });
  });
};

export default gmRenderReact;
