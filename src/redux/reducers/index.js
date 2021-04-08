import { combineReducers } from 'redux';
import loggedInReducer from './logged-in-reducer';
import userReducer from './user-reducer';
import { isDarkMode } from './dark-mode-reducer';

const index = combineReducers({
  user: userReducer,
  loggedIn: loggedInReducer,
  isDarkMode,
});

export default index;
