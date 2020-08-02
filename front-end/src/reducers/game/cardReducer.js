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
  TOGGLE_GLOW,
  PUT_REVERSE,
  UPDATE_CARD,
  FORCE_DRAW,
} from '../../actions/types';
import _ from 'lodash';
import { addCardToIds } from '../../actions/cardActions';

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_CARD:
    case UPDATE_CARD:
    case PUT_CARD: {
      const { cardId, value } = payload; // Value should always be null on ADD_CARD
      return { ...state, [cardId]: { value, glow: false } };
    }
    case FORCE_DRAW:
    case PUT_REVERSE: {
      const { cardId } = payload;
      return { ...state, [cardId]: { value: null, glow: false } };
    }
    case REMOVE_CARD:
      return _.omit(state, payload.cardId.toString());
    case SWAP_CARDS: {
      // TODO: REFACTOR LATER
      const { cardId, tempCardId } = payload;
      return {
        ...state,
        [cardId]: { value: payload.value, glow: false },
        [tempCardId]: { value: null, glow: false },
      };
    }
    case TOGGLE_GLOW: {
      const { cardId } = payload;
      const { value, glow } = state[cardId];
      console.log(`cardId: ${cardId}, value: ${value} glow: ${glow}`);
      return {
        ...state,
        [cardId]: { value, glow: !glow },
      };
    }
    default:
      return state;
  }
};

const byPlayerId = (state = [], { type, payload }) => {
  switch (type) {
    case PUT_REVERSE: {
      const newState = state.slice();
      const { index, cardId } = payload;
      newState[index] = cardId;
      return newState;
    }
    case FORCE_DRAW: {
      const indexOfNull = state.indexOf(null); // Find first empty card. -1 if hand is full
      const index = indexOfNull === -1 ? state.length : indexOfNull;
      return [...state.slice(0, index), payload.cardId, ...state.slice(index)];
    }
    case ADD_CARD_TO_HAND: // Inserts card at specific index
      const index = payload.index !== undefined ? payload.index : state.length; // If no index specified, insert at the end
      return [...state.slice(0, index), payload.cardId, ...state.slice(index)];
    case REMOVE_CARD_FROM_HAND:
    case PUT_CARD:
      return state.map((cardId) => (cardId === payload.cardId ? null : cardId)); // Insert null where the card previously was
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
    case PUT_CARD:
      return [...state, payload.cardId];
    case PUT_REVERSE:
      return [...state.slice(0, -1)]; // Remove the top card that failed
    case DISCARD_CARD:
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
    state.byId[state[playerId][i]] = { value: null, glow: false };
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
    case TOGGLE_GLOW:
    case UPDATE_CARD:
      return { ...state, byId: byId(state.byId, action) };
    case ADD_CARD_TO_HAND:
    case REMOVE_CARD_FROM_HAND: {
      const playerId = action.payload.playerId;
      return { ...state, [playerId]: byPlayerId(state[playerId], action) };
    }
    case DRAW_FROM_DECK:
      return { ...state, temporaryCard: temporaryCard(state.temporaryCard, action) };
    case PUT_CARD:
    case PUT_REVERSE: {
      const victim = action.payload.victim;
      return {
        ...state,
        discardPile: discardPile(state.discardPile, action),
        [victim]: byPlayerId(state[victim], action),
        byId: byId(state.byId, action),
      };
    }
    case FORCE_DRAW:
      const playerId = action.payload.playerId;
      return {
        ...state,
        byId: byId(state.byId, action),
        [playerId]: byPlayerId(state[playerId], action),
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
