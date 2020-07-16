import { combineReducers } from 'redux';
import playersReducer from './players/playersReducer';
import roundReducer from './round/roundReducer';

export default combineReducers({
  players: playersReducer,
  round: roundReducer,
});
