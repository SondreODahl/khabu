import { combineReducers } from 'redux';
import {
  CHOOSE_CARD_FOR_EFFECT,
  DISCARD_CARD,
  EXCHANGE_CARDS,
  FINISH_EFFECT,
} from '../../actions/types';

const effectType = (state = null, { type, payload }) => {
  switch (type) {
    case DISCARD_CARD:
      return payload.value >= 7 ? payload.value : null; // If 7 or more, there is an effect
    case FINISH_EFFECT:
      return false;
    default:
      return state;
  }
};

const chosenCards = (
  state = {
    cardOne: { cardId: null, victimId: null },
    cardTwo: { cardId: null, victimId: null },
  },
  { type, payload }
) => {
  switch (type) {
    case CHOOSE_CARD_FOR_EFFECT:
      const { cardId, victimId } = payload;
      if (state.cardOne)
        // Already chosen the first card
        return { ...state, cardTwo: { cardId, victimId } };
      return { ...state, cardOne: { cardId, victimId } };
    case EXCHANGE_CARDS:
    case FINISH_EFFECT:
      return { cardOne: null, cardTwo: null };
    default:
      return state;
  }
};

export default combineReducers({
  effectType: effectType,
  chosenCards,
});
