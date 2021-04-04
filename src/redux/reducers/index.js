import { combineReducers } from 'redux';
import loggedInReducer from './logged-in-reducer';
import setUserReducer from './set-user-reducer';
import { isDarkMode } from './dark-mode-reducer';

const index = combineReducers({
  userData: setUserReducer,
  loggedIn: loggedInReducer,
  isDarkMode
});

export default index;
