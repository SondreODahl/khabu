import { combineReducers } from 'redux';
import restReducer from './API/restReducer';
import { clientReducer, connectedClientReducer } from './API/clientReducer';
import subReducer from './API/subReducer';
import joinFormReducer from './joinFormReducer';
import readyReducer from './readyReducer';
import roundReducer from './roundReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  data: restReducer,
  client: clientReducer,
  connected: connectedClientReducer,
  game: gameReducer,
  subscription: subReducer,
  round: roundReducer,
  ready: readyReducer,
  form: joinFormReducer,
});
