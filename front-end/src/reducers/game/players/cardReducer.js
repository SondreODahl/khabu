import { ADD_CARD, ALL_PLAYERS_READY, REMOVE_CARD } from '../../../actions/types';
import _ from 'lodash';

const addCard = (state, { id, value }) => {
  const card = { id, value };
  return { ...state, [id]: card };
};

const removeCard = (state, id) => {
  return _.omit(state, id.toString());
};

const cardsByPlayerId = (state = {}, action) => {
  switch (action.type) {
    case ADD_CARD:
      return addCard(state, action);
    case REMOVE_CARD:
      return removeCard(state, action.payload.id);
    default:
      return state;
  }
};

const cardHandsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_PLAYERS_READY:
      for (let id of action.payload.playerIds) {
        state[id] = {};
      }
      return { ...state };
    case ADD_CARD:
    case REMOVE_CARD:
      const playerId = action.payload.playerId;
      return { ...state, [playerId]: cardsByPlayerId(state[playerId], action) };
    default:
      return state;
  }
};
export default cardHandsReducer;
