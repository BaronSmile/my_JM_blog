import { SET_USER } from '../actions';

const initialUserState = {};

const setUserReducer = (state = initialUserState, { type, user }) => {
  switch (type) {
    case SET_USER:
      return { ...state, user };

    default:
      return state;
  }
};

export default setUserReducer;
