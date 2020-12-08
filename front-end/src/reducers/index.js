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

/* 
  Home of the entire store for the Redux state. Currently, all state is located in the store.
  In the future, it may be desirable to move some of this state locally instead. 
  cards - All cards currently in play and their Ids. Ordered by Id and playerId. Also contains discardPile and tempCard. 
  api - 
  players - 
  round - State of one round, revealed cards and revealtime, readied up.
  form - Form used for submitting a username.
  turn - Who's the current- / currentPutting- / khabu player in a turn
  gameState - 
  scores - Each player's total score, by Id.
  effect - 
*/

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
