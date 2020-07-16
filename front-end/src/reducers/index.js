import { combineReducers } from 'redux';
import restReducer from './API/restReducer';
import { clientReducer, connectedClientReducer } from './API/clientReducer';
import subReducer from './API/subReducer';
import joinFormReducer from './joinFormReducer';
import readyReducer from './Game/readyReducer';
import roundReducer from './Game/roundReducer';
import gameReducer from './Game/gameReducer';
import cardReducer from './Game/cardReducer';
import apiReducer from './API/apiReducer';

export default combineReducers({
  data: restReducer,
  cards: cardReducer,
  api: apiReducer,
  game: gameReducer,
  round: roundReducer,
  ready: readyReducer,
  form: joinFormReducer,
});
