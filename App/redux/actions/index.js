// import { checkStatus } from '../../../lib/fetch';
// import fetch from 'isomorphic-fetch';
import * as ActionTypes from '../constants/';

export function updateClick(value) {
  return {
    type: ActionTypes.ADD_CLICK,
    value,
  };
}

export function setClick(action) {
  return (dispatch, getState) => {
    const state = getState();
    let newClick = state.click;
    if (action === 'ADD') {
      newClick += 1;
    } else if (action === 'REMOVE') {
      newClick = newClick > 0 ? newClick - 1 : newClick;
    }
    return dispatch(updateClick(newClick));
  };
}

// export function getMDForCms(page, renderProps = {}) {
//   return (dispatch, getState) => {
//     const state = getState();
//     const lng = state.config.lng;
//     if (pages.indexOf(page) === -1) {
//       return dispatch(GlobalActions.redirect('/'));
//     }
//     return fetch(`${state.config.host}/cms/${lng}/${page}.md`, {
//       method: 'get',
//       credentials: 'same-origin',
//     }, renderProps)
//     // verif if not error server
//     .then(checkStatus)
//     .then((res) => {
//       return res.text();
//     })
//     // success !!
//     .then((response) => {
//       dispatch(setPageCms(response));
//     })
//     // oh bad !!
//     .catch(() => {
//       dispatch(setPageCms(''));
//     });
//   };
// }
