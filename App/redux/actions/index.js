import fetch from 'isomorphic-fetch';
import { checkStatus } from '../../lib/utils';
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

export function setPosts(value) {
  return {
    type: ActionTypes.SET_POSTS,
    value,
  };
}

export function getPosts() {
  return (dispatch) => {
    return fetch('http://', {
      method: 'get',
      credentials: 'same-origin',
    })
    // verif if not error server
    .then(checkStatus)
    .then((res) => {
      return res.text();
    })
    // success !!
    .then((response) => {
      dispatch(setPosts(JSON.parse(response)));
    })
    // oh bad !!
    .catch(() => {
      dispatch(setPosts({}));
    });
  };
}
