import { combineReducers } from 'redux';
import {
  CHECK_CARD,
  CHOOSE_CARD_EFFECT,
  DISCARD_CARD,
  EXCHANGE_CARDS,
  FINISH_EFFECT,
} from '../../actions/types';

/* 
  All state related to card effects.
  chosenCards - What cardIds have been chosen for use with current effect. May require one or two. 
  effectType - Type of current effect. May be null if no effect. 
  */

const initChosenCardsState = {
  cardOne: null,
  cardTwo: null,
};

const chosenCards = (state = initChosenCardsState, { type, payload }) => {
  switch (type) {
    case CHECK_CARD:
    case CHOOSE_CARD_EFFECT:
      const { cardId, victimId } = payload;
      if (state.cardOne)
        // Already chosen the first card
        return { ...state, cardTwo: { cardId, victimId } };
      return { ...state, cardOne: { cardId, victimId } };
    /* case CHECK_CARD: { THINK THIS PART CAN BE REMOVED BUT NOT ENTIRELY SURE
       const { cardId } = payload;
       return { ...state, cardOne: { cardId } };
     } */
    case EXCHANGE_CARDS:
    case FINISH_EFFECT:
      return { ...initChosenCardsState };
    default:
      return state;
  }
};

const effectType = (state = null, { type, payload }) => {
  switch (type) {
    case DISCARD_CARD: {
      const effectCriteria = 7; // Value must be seven or higher to have an effect
      return payload.value >= effectCriteria ? payload.value : null;
    }
    case FINISH_EFFECT:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  chosenCards,
  effectType,
});
