import { ACTIVATE_EFFECT, CHOOSE_CARD_FOR_EFFECT } from './types';

export const activateEffect = () => {
  return { type: ACTIVATE_EFFECT };
};

export const chooseCardForEffect = (cardId) => {
  return { type: CHOOSE_CARD_FOR_EFFECT, payload: { cardId } };
};
