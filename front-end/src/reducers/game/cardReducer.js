import _ from 'lodash';
import { addCardToIds } from '../../actions/cardActions';
import {
  ADD_CARD,
  ADD_CARD_TO_HAND,
  ALL_PLAYERS_READY,
  CARD_GLOW,
  DISCARD_CARD,
  DRAW_CARD_DISCARD,
  DRAW_FROM_DECK,
  EXCHANGE_CARDS,
  FORCE_DRAW,
  HIDE_HAND,
  PUT_CARD,
  PUT_REVERSE,
  REMOVE_CARD,
  REMOVE_CARD_FROM_HAND,
  ROUND_END,
  SWAP_CARDS,
  TRANSFER_CARD,
  UPDATE_CARD,
} from '../../actions/types';

/* 
  All state related to cards. Cards are accessed either by their Id (direct object). 
  All cards in a players hand is accessed by their playerId (array of Ids). 
  To achieve state based on playerId, a custom reducer is used instead of combineReducers. See the
  bottom of the file for it. 
  byId - Each cardId as key and their value and whether they glow or not as value.
  byplayerId - All cardIds in a player's hand. 
  discardPile - All cardIds currently in the discard pile.
  temporaryCard - cardId of the card that was drawn and not yet chosen what to do with.
*/

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_CARD:
    case DISCARD_CARD:
    case FORCE_DRAW:
    case PUT_REVERSE:
    case PUT_CARD:
    case UPDATE_CARD: {
      const { cardId, value } = payload; // Value should always be null on ADD_CARD/FORCE_DRAW/PUT_REVERSE
      return { ...state, [cardId]: { value, glow: false } }; // TODO: Refactor glow
    }
    case CARD_GLOW: {
      const { cardId, glow } = payload;
      const { value } = state[cardId];
      return {
        ...state,
        [cardId]: { value, glow },
      };
    }
    case REMOVE_CARD:
      return _.omit(state, payload.cardId.toString());
    case ROUND_END: {
      return { ...state, ...payload.cards };
    }
    case SWAP_CARDS: {
      const { cardId, tempCardId } = payload;
      const cardIdGlow = state[cardId].glow;
      const tempCardIdGlow = state[tempCardId].glow;
      return {
        ...state,
        [cardId]: { value: payload.value, glow: cardIdGlow },
        [tempCardId]: { value: null, glow: tempCardIdGlow },
      };
    }
    default:
      return state;
  }
};

const byPlayerId = (state = [], { type, payload }) => {
  switch (type) {
    case EXCHANGE_CARDS:
    case SWAP_CARDS:
      return state.map((card) =>
        card === payload.cardId ? payload.tempCardId : card
      ); // Replace the card with the temp
    case FORCE_DRAW: {
      const indexOfNull = state.indexOf(null); // Find first empty card. -1 if hand is full
      const index = indexOfNull === -1 ? state.length : indexOfNull;
      return [...state.slice(0, index), payload.cardId, ...state.slice(index + 1)]; // Want to replace the null value. Therefore + 1
    }
    case PUT_CARD:
      return state.map((cardId) => (cardId === payload.cardId ? null : cardId)); // Insert null where the card previously was
    case PUT_REVERSE: {
      const newState = state.slice();
      const { index, cardId } = payload;
      newState[index] = cardId;
      return newState;
    }
    case TRANSFER_CARD: {
      const { victimCardIndex, cardId } = payload;
      const isAgent = state.indexOf(cardId) !== -1; // Does the current hand contain the agentCard
      if (isAgent) return state.map((id) => (id === cardId ? null : id)); // Insert null where the card previously was
      return [
        ...state.slice(0, victimCardIndex),
        payload.cardId,
        ...state.slice(victimCardIndex + 1),
      ]; // Want to replace the null value. Therefore + 1
    }
    default:
      return state;
  }
};

const discardPile = (state = [], { type, payload }) => {
  switch (type) {
    case DISCARD_CARD:
    case SWAP_CARDS:
      return [...state, payload.cardId];
    case DRAW_CARD_DISCARD:
      return state.filter((cardId) => cardId !== payload.cardId);
    case PUT_CARD:
      return [...state, payload.cardId];
    case PUT_REVERSE:
      return [...state.slice(0, -1)]; // Remove the top card that failed
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

// ----------------------------- Helper methods -----------------------------

// Generates the inital reducer states for each state type except byPlayerId
const getNewInitState = () => {
  return {
    byId: byId(undefined, {}),
    discardPile: discardPile(undefined, {}),
    temporaryCard: temporaryCard(undefined, {}),
  };
};

// Generates a certain amount of cardIds for each playerHand
const initializeHands = (state, action) => {
  let cardId = 0;
  for (let playerId of action.payload.playerIds) {
    state[playerId] = byPlayerId(undefined, action);
    for (let i = 0; i < action.payload.startingHandSize; i++) {
      state[playerId][i] = cardId;
      state.byId = byId(state.byId, addCardToIds(cardId, null));
      cardId++;
    }
  }
};

const hidePlayerHand = (state, playerId) => {
  for (let i = 0; i < state[playerId].length; i++) {
    state.byId[state[playerId][i]] = { value: null, glow: false };
  }
  return { ...state };
};

// ------------------------ Custom main reducer -------------------------------

// Used instead of combineReducers. Will look at the action type and send the relevant state to
// the relevant reducer functions. Used to achieve playerId keys and also to resetState easily.
// TODO: Consider going back to combineReducers. Should be done after testing is done.
const cardHandsReducer = (state = getNewInitState(), action) => {
  switch (action.type) {
    case ADD_CARD:
    case REMOVE_CARD:
    case CARD_GLOW:
    case ROUND_END:
    case UPDATE_CARD:
      return { ...state, byId: byId(state.byId, action) };
    case ADD_CARD_TO_HAND:
    case REMOVE_CARD_FROM_HAND: {
      const { playerId } = action.payload;
      return { ...state, [playerId]: byPlayerId(state[playerId], action) };
    }
    case ALL_PLAYERS_READY:
      const resetState = getNewInitState();
      initializeHands(resetState, action); // Method will mutate resetState
      return resetState;
    case DISCARD_CARD:
      return {
        ...state,
        byId: byId(state.byId, action),
        discardPile: discardPile(state.discardPile, action),
        temporaryCard: temporaryCard(state.temporaryCard, action),
      };
    case DRAW_CARD_DISCARD:
      return { ...state, discardPile: discardPile(state.discardPile, action) };
    case DRAW_FROM_DECK:
      return { ...state, temporaryCard: temporaryCard(state.temporaryCard, action) };
    case EXCHANGE_CARDS:
      const { cardOne, cardTwo } = action.payload;
      return {
        ...state,
        [cardOne.victimId]: byPlayerId(state[cardOne.victimId], {
          type: action.type,
          payload: { cardId: cardOne.cardId, tempCardId: cardTwo.cardId },
        }),
        [cardTwo.victimId]: byPlayerId(state[cardTwo.victimId], {
          type: action.type,
          payload: { cardId: cardTwo.cardId, tempCardId: cardOne.cardId },
        }),
      };
    case FORCE_DRAW: {
      const { playerId } = action.payload;
      return {
        ...state,
        byId: byId(state.byId, action),
        [playerId]: byPlayerId(state[playerId], action),
      };
    }
    case HIDE_HAND:
      return hidePlayerHand(state, action.payload.playerId);
    case PUT_CARD:
    case PUT_REVERSE: {
      const { victim } = action.payload;
      return {
        ...state,
        byId: byId(state.byId, action),
        discardPile: discardPile(state.discardPile, action),
        [victim]: byPlayerId(state[victim], action),
      };
    }
    case SWAP_CARDS: {
      const { playerId } = action.payload;
      return {
        ...state,
        byId: byId(state.byId, action),
        discardPile: discardPile(state.discardPile, action),
        temporaryCard: temporaryCard(state.temporaryCard, action),
        [playerId]: byPlayerId(state[playerId], action),
      };
    }
    case TRANSFER_CARD: {
      const { victim, agent } = action.payload;
      return {
        ...state,
        [agent]: byPlayerId(state[agent], action),
        [victim]: byPlayerId(state[victim], action),
      };
    }
    default:
      return state;
  }
};
export default cardHandsReducer;
