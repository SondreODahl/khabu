import { combineReducers } from 'redux';
import restReducer from './restReducer';
import { clientReducer, connectedClientReducer } from './clientReducer';
import subReducer from './subReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  data: restReducer,
  client: clientReducer,
  connected: connectedClientReducer,
  subscription: subReducer,
  game: gameReducer,
});
