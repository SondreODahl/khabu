import { combineReducers } from 'redux';
import joinFormReducer from './joinFormReducer';
import readyReducer from './game/readyReducer';
import roundReducer from './game/roundReducer';
import cardReducer from './game/cardReducer';
import apiReducer from './API/apiReducer';
import playersReducer from './game/playersReducer';

export default combineReducers({
  cards: cardReducer,
  api: apiReducer,
  players: playersReducer,
  round: roundReducer,
  form: joinFormReducer,
});
