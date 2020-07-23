import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

const selectAllCards = (state) => state.cards.byId;
export const selectCard = createCachedSelector(
  (state, id) => state.cards.byId[id],
  (card) => card
)((state, id) => id);

export const selectCardHand = createCachedSelector(
  (state, playerId) => state.cards[playerId],
  (hand) => hand
)((state, playerId) => playerId);

const getCardsBelongingToPlayer = createSelector(
  selectCardHand,
  selectAllCards,
  (hand, cards) => {
    cards.filter();
  }
);
export const getCardIndexForCard = createCachedSelector(
  selectCard,
  selectCardHand,
  (card, hand) => hand.findIndex(card)
)((state, id, playerId) => id);
