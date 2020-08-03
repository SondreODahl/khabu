import { combineReducers } from 'redux';
import {
  CHOOSE_CARD_FOR_EFFECT,
  DISCARD_CARD,
  EXCHANGE_CARDS,
  FINISH_EFFECT,
} from '../../actions/types';

const hasEffect = (state = false, { type, payload }) => {
  switch (type) {
    case DISCARD_CARD:
      return payload.value >= 7; // EffectPlayer will ALWAYS be currentPlayer
    case FINISH_EFFECT:
      return false;
    default:
      return state;
  }
};

const chosenCards = (
  state = { cardOne: null, cardTwo: null },
  { type, payload }
) => {
  switch (type) {
    case CHOOSE_CARD_FOR_EFFECT:
      const { cardId } = payload;
      if (state.cardOne)
        // Already chosen the first card
        return { ...state, cardTwo: cardId };
      return { ...state, cardOne: cardId };
    case EXCHANGE_CARDS:
    case FINISH_EFFECT:
      return { cardOne: null, cardTwo: null };
    default:
      return state;
  }
};

export default combineReducers({
  hasEffect,
  chosenCards,
});
