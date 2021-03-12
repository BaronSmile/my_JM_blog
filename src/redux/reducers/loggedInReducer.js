import {SET_LOGGED_IN} from "../actions";

const initialLoggedState = false;

const loggedInReducer = (state = initialLoggedState, {type, payload}) => {
  switch (type) {
    case SET_LOGGED_IN:
      return payload;
    default:
      return state;
  }
};

export default loggedInReducer;