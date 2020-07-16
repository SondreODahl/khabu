import { combineReducers } from 'redux';
import restReducer from './API/restReducer';
import { clientReducer, connectedClientReducer } from './API/clientReducer';
import subReducer from './API/subReducer';
import joinFormReducer from './joinFormReducer';
import readyReducer from './readyReducer';
import roundReducer from './roundReducer';
import gameReducer from './gameReducer';
import cardReducer from './cardReducer';

export default combineReducers({
  data: restReducer,
  cards: cardReducer,
  client: clientReducer,
  connected: connectedClientReducer,
  game: gameReducer,
  subscription: subReducer,
  round: roundReducer,
  ready: readyReducer,
  form: joinFormReducer,
});
