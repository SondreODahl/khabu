import { combineReducers } from 'redux';
import joinFormReducer from './joinFormReducer';
import roundReducer from './game/roundReducer';
import cardReducer from './game/cardReducer';
import apiReducer from './API/apiReducer';
import playersReducer from './game/playersReducer';
import turnReducer from './game/turnReducer';
import gameStateReducer from './game/gameStateReducer';
import scoresReducer from './game/scoresReducer';
import effectReducer from './game/effectReducer';

export default combineReducers({
  cards: cardReducer,
  api: apiReducer,
  players: playersReducer,
  round: roundReducer,
  form: joinFormReducer,
  turn: turnReducer,
  gameState: gameStateReducer,
  scores: scoresReducer,
  effect: effectReducer,
});
