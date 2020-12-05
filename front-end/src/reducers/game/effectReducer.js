import { combineReducers } from 'redux';
import {
  CHECK_CARD,
  CHOOSE_CARD_FOR_EFFECT,
  DISCARD_CARD,
  EXCHANGE_CARDS,
  FINISH_EFFECT,
} from '../../actions/types';

const effectType = (state = null, { type, payload }) => {
  switch (type) {
    case DISCARD_CARD: {
      const effectCriteria = 7;
      return payload.value >= effectCriteria ? payload.value : null;
    }
    case FINISH_EFFECT:
      return null;
    default:
      return state;
  }
};

const chosenCards = (
  state = {
    cardOne: null,
    cardTwo: null,
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
    case CHECK_CARD: {
      const { cardId } = payload;
      return { ...state, cardOne: { cardId } };
    }
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
