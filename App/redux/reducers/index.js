import * as ActionTypes from '../constants';

// the list of posts
export const posts = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.SET_POSTS:
      return action.value;
    case ActionTypes.RESET_POSTS:
      return action.value;
    default:
      return state;
  }
};

// the post for single page
export const post = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SET_POST:
      return action.value;
    case ActionTypes.RESET_POST:
      return action.value;
    default:
      return state;
  }
};
