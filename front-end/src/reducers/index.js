import { combineReducers } from 'redux';
import restReducer from './restReducer';
import { clientReducer, connectedClientReducer } from './clientReducer';
import subReducer from './subReducer';
import joinFormReducer from './joinFormReducer';
import readyReducer from './readyReducer';

export default combineReducers({
  data: restReducer,
  client: clientReducer,
  connected: connectedClientReducer,
  subscription: subReducer,
  ready: readyReducer,
  form: joinFormReducer,
});
