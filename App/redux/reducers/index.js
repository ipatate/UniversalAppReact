import * as ActionTypes from '../constants';

export const click = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CLICK:
      return action.value;
    default:
      return state;
  }
};
