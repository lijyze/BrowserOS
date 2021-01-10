import {createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import menubar from './menubar/reducer'

const store = createStore(combineReducers({
  menubar
}), composeWithDevTools());

export default store;
