import {
  ADD_CARD,
  ADD_CARD_TO_HAND,
  ALL_PLAYERS_READY,
  DRAW_CARD_DISCARD,
  PUT_CARD,
  REMOVE_CARD,
  REMOVE_CARD_FROM_HAND,
  ROUND_END,
  SHOW_CARD,
} from '../../actions/types';
import _ from 'lodash';
import { addCardToIds } from '../../actions/cardActions';

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_CARD:
    case SHOW_CARD:
      const { id, value } = payload; // Value should always be null on ADD_CARD
      return { ...state, [id]: value };
    case REMOVE_CARD:
      return _.omit(state, payload.id.toString());
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

const initializeHands = (state, action) => {
  let cardId = 0;
  for (let id of action.payload.playerIds) {
    state[id] = byPlayerId(undefined, action);
    for (let i = 0; i < action.payload.startingHandSize; i++) {
      state[id][i] = cardId;
      state.byId = byId(state.byId, addCardToIds(cardId, null));
      cardId++;
    }
  }
};

const getNewInitState = () => {
  return { byId: byId(undefined, {}), discardPile: discardPile(undefined, {}) };
};

const cardHandsReducer = (state = getNewInitState(), action) => {
  switch (action.type) {
    case ALL_PLAYERS_READY:
      const reset_state = getNewInitState();
      initializeHands(reset_state, action);
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
