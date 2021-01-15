import {createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import menubar from './menubar/reducer'
// import playground from './playground/reducer'
import docker from './docker/reducer'
import global from './global/reducer'

const store = createStore(combineReducers({
  menubar,
  // playground,
  docker,
  global
}), composeWithDevTools());

export default store;
