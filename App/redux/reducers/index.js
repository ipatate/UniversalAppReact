import * as ActionTypes from '../constants';

export const click = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CLICK:
      return action.value;
    default:
      return state;
  }
};


export const posts = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.SET_POSTS:
      return action.value;
    default:
      return state;
  }
};
