import { combineReducers } from 'redux';
import joinFormReducer from './joinFormReducer';
import readyReducer from './game/round/readyReducer';
import roundReducer from './game/round/roundReducer';
import gameReducer from './game/gameReducer';
import cardReducer from './game/players/cardReducer';
import apiReducer from './API/apiReducer';

export default combineReducers({
  cards: cardReducer,
  api: apiReducer,
  game: gameReducer,
  round: roundReducer,
  ready: readyReducer,
  form: joinFormReducer,
});
