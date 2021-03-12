export const SET_USER = 'SET_USER';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const setUser = (payload) => ({ type: SET_USER, user: payload });
export const setLoggedIn = (payload) => ({ type: SET_LOGGED_IN, payload });