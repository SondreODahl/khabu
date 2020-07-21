import {
  ADD_CARD,
  ADD_CARD_TO_HAND,
  ALL_PLAYERS_READY,
  DRAW_CARD_DISCARD,
  PUT_CARD,
  REMOVE_CARD,
  REMOVE_CARD_FROM_HAND,
  ROUND_END,
} from '../../actions/types';
import _ from 'lodash';

const addCard = (state, { id, value }) => {
  const card = { id, value };
  return { ...state, [id]: card };
};

const removeCard = (state, id) => {
  return _.omit(state, id.toString());
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_CARD:
      return addCard(state, action);
    case REMOVE_CARD:
      return removeCard(state, action.payload.id);
    default:
      return state;
  }
};

const byPlayerId = (state = [], { type, payload }) => {
  switch (type) {
    case ADD_CARD_TO_HAND:
      return [...state, payload.cardId];
    case REMOVE_CARD_FROM_HAND:
      return state.filter((cardId) => cardId !== payload.cardId);
    default:
      return state;
  }
};

const discardPile = (state = [], { type, payload }) => {
  switch (type) {
    case PUT_CARD:
      return [...state, payload.cardId];
    case DRAW_CARD_DISCARD:
      return state.filter((cardId) => cardId !== payload.cardId);
    default:
      return state;
  }
};

const getNewInitState = () => {
  return { byId: byId(undefined, {}), discardPile: discardPile(undefined, {}) };
};

const cardHandsReducer = (state = getNewInitState(), action) => {
  switch (action.type) {
    case ALL_PLAYERS_READY:
      const reset_state = getNewInitState();
      for (let id of action.payload.playerIds) {
        reset_state[id] = byPlayerId(undefined, action);
      }
      return reset_state;
    case ADD_CARD:
    case REMOVE_CARD:
      return { ...state, byId: byId(state.byId, action) };
    case ADD_CARD_TO_HAND:
    case REMOVE_CARD_FROM_HAND:
      const playerId = action.payload.playerId;
      return { ...state, [playerId]: byPlayerId(state[playerId], action) };
    case PUT_CARD:
    case DRAW_CARD_DISCARD:
      return { ...state, discardPile: discardPile(state.discardPile, action) };
    default:
      return state;
  }
};
export default cardHandsReducer;