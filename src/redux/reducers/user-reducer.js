import { REGISTER_USER, AUTHENTICATE_USER, UPDATE_USER, LOGOUT_USER } from '../actions';

const initState = {};

const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
      return payload;
    case AUTHENTICATE_USER:
      return payload;
    case UPDATE_USER:
      return payload;
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};

export default userReducer;
