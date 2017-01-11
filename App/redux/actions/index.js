import fetch from 'isomorphic-fetch';
import { checkStatus } from '../../lib/utils';
import * as ActionTypes from '../constants/';

export function setPosts(value) {
  return {
    type: ActionTypes.SET_POSTS,
    value,
  };
}

export function resetPosts() {
  return {
    type: ActionTypes.RESET_POSTS,
    value: [],
  };
}
// load list of post
export function loadPosts() {
  return (dispatch) => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'get',
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

// reload the list of posts
export function reloadPost() {
  return (dispatch) => {
    return Promise.all([
      dispatch(resetPosts()),
      dispatch(loadPosts()),
    ]);
  };
}

// set post for single page
export function setPost(value) {
  return {
    type: ActionTypes.SET_POST,
    value,
  };
}

// load single post
export function loadPost(id) {
  return (dispatch) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
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
      dispatch(setPost(JSON.parse(response)));
    })
    // oh bad !!
    .catch(() => {
      dispatch(setPost({}));
    });
  };
}

// find post by id into list posts
export function findPost(id) {
  return (dispatch, getState) => {
    const state = getState();
    const posts = state.posts;
    // search post into list if exist
    const p = posts.find((post) => {
      return (post.id === +id);
    });
    // if find return the post
    if (p) {
      return dispatch(setPost(p));
    }
    // or load the post
    return dispatch(loadPost(id));
  };
}
