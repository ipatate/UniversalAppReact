// React
import React from 'react';
// use for render react from server
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
// redux
import { configureStore } from '../../app/redux/store/configureStore';
import { Provider } from 'react-redux';

// method for init state from component
import { gmInitComponentData } from './gmInitComponentData';
// the shared route
import routes from '../../App/routes/routes';


const gmRenderReact = function(req, res, next) {
  return match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    // if not route found in router return next for display error 404 or other node page if exist
    if (!renderProps) {
      return next();
    }
    // init the store
    const store = configureStore({});
    // fetch all func for init the children components
    return gmInitComponentData(store.dispatch, renderProps).then(() => {
      let initialView = '';
      // render the string with react component mounted
      try {
        initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
      } catch (error) {
        // throw error;
        console.log(error);
      }

      const finalState = store.getState();
      return res.render('main', { reactOutput: initialView, initialState: JSON.stringify(finalState) });
    });
  });
};

export default gmRenderReact;
