import {combineReducers} from "redux";
import loggedInReducer from './loggedInReducer';
import setUserReducer from './setUserReducer';
import {darkMode} from "./darkModeReducer";

const rootReducer = combineReducers({
  userData: setUserReducer,
  loggedIn: loggedInReducer,
  themeMode: darkMode
})

export default rootReducer;