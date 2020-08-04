import { ACTIVATE_EFFECT, CHOOSE_CARD_FOR_EFFECT } from './types';
import { toggleCardGlow } from './cardActions';

export const activateEffect = () => {
  return { type: ACTIVATE_EFFECT };
};

export const chooseCardForEffect = (cardId, victimId) => {
  return { type: CHOOSE_CARD_FOR_EFFECT, payload: { cardId, victimId } };
};

export const playerChoseCard = (victimId, cardIndex) => (dispatch, getState) => {
  const cardId = getState().cards[victimId][cardIndex];
  dispatch(chooseCardForEffect(cardId, victimId));
  dispatch(toggleCardGlow(cardId, true));
};

export const playerExchangedCards = () => (dispatch, getState) => {
  const { cardOne, cardTwo } = getState().effects.chosenCards;
};
