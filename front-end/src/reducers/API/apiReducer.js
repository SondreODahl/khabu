import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import restReducer from './restReducer';
import subReducer from './subReducer';

export default combineReducers({
  client: clientReducer,
  rest: restReducer,
  subscriptions: subReducer,
});
