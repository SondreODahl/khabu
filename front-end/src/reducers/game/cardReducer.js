import {
  ADD_CARD,
  ADD_CARD_TO_HAND,
  ALL_PLAYERS_READY,
  DRAW_CARD_DISCARD,
  PUT_CARD,
  REMOVE_CARD,
  REMOVE_CARD_FROM_HAND,
  HIDE_HAND,
  ROUND_END,
  SHOW_CARD,
  START_ROUND,
  DISCARD_CARD,
  DRAW_FROM_DECK,
  SWAP_CARDS,
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
    case SWAP_CARDS: // TODO: REFACTOR LATER
      const { cardId, tempCardId } = payload;
      return { ...state, [cardId]: payload.value, [tempCardId]: null };
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
    case SWAP_CARDS:
      return state.map((card) =>
        card === payload.cardId ? payload.tempCardId : card
      ); // Replace the card with the temp
    default:
      return state;
  }
};

const discardPile = (state = [], { type, payload }) => {
  switch (type) {
    case DISCARD_CARD:
    case PUT_CARD:
    case SWAP_CARDS:
      return [...state, payload.cardId];
    case DRAW_CARD_DISCARD:
      return state.filter((cardId) => cardId !== payload.cardId);
    default:
      return state;
  }
};

const temporaryCard = (state = null, { type, payload }) => {
  switch (type) {
    case DISCARD_CARD:
    case SWAP_CARDS:
      return null;
    case DRAW_FROM_DECK:
      return payload.cardId;
    default:
      return state;
  }
};

// Helper methods

const resetHand = (state, playerId) => {
  for (let i = 0; i < state[playerId].length; i++) {
    state.byId[state[playerId][i]] = null;
  }
  return { ...state };
};

const initializeHands = (state, action) => {
  // HELPER METHOD
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
  // HELPER METHOD
  return {
    byId: byId(undefined, {}),
    discardPile: discardPile(undefined, {}),
    temporaryCard: temporaryCard(undefined, {}),
  };
};

const cardHandsReducer = (state = getNewInitState(), action) => {
  switch (action.type) {
    case ALL_PLAYERS_READY:
      const reset_state = getNewInitState();
      initializeHands(reset_state, action);
      return reset_state;
    case HIDE_HAND:
      return resetHand(state, action.payload.playerId);
    case ADD_CARD:
    case REMOVE_CARD:
      return { ...state, byId: byId(state.byId, action) };
    case ADD_CARD_TO_HAND:
    case REMOVE_CARD_FROM_HAND:
      const playerId = action.payload.playerId;
      return { ...state, [playerId]: byPlayerId(state[playerId], action) };
    case DRAW_FROM_DECK:
      return { ...state, temporaryCard: temporaryCard(state.temporaryCard, action) };
    case PUT_CARD:
      return {
        ...state,
        discardPile: discardPile(state.discardPile, action),
      };
    case DISCARD_CARD:
      return {
        ...state,
        discardPile: discardPile(state.discardPile, action),
        temporaryCard: temporaryCard(state.temporaryCard, action),
      };
    case SWAP_CARDS:
      return {
        ...state,
        discardPile: discardPile(state.discardPile, action),
        temporaryCard: temporaryCard(state.temporaryCard, action),
        [action.payload.playerId]: byPlayerId(
          state[action.payload.playerId],
          action
        ),
        byId: byId(state.byId, action),
      };
    case DRAW_CARD_DISCARD:
      return { ...state, discardPile: discardPile(state.discardPile, action) };
    default:
      return state;
  }
};
export default cardHandsReducer;
