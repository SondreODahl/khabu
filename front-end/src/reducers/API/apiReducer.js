import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import subReducer from './subReducer';

export default combineReducers({
  client: clientReducer,
  subscriptions: subReducer,
});
