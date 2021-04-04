import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import index from './reducers';

const store = createStore(index, composeWithDevTools());

export default store;
