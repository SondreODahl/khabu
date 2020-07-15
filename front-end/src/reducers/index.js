import { combineReducers } from 'redux';
import restReducer from './API/restReducer';
import { clientReducer, connectedClientReducer } from './API/clientReducer';
import subReducer from './API/subReducer';
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
