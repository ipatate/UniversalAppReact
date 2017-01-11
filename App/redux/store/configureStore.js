import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import * as rootReducer from '../reducers';
// import DevTools from '../../Components/DevTools';

export function configureStore(initialState = {}) {
  let finalCreateStore;
  const reducer = combineReducers(rootReducer);
  if (process.env.CLIENT) {
    finalCreateStore = compose(
      applyMiddleware(thunk)
      // , persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
      // , DevTools.instrument()
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(thunk)(createStore);
  }

  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export default configureStore;
