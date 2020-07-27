import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

const selectAllCards = (state) => state.cards.byId;
const selectCardById = (state, props) => state.cards.byId[props.id];
const selectCardHandByPlayerId = (state, props) => state.cards[props.playerId];

export const selectCard = createCachedSelector(
  selectCardById,
  (card) => card
)((state, props) => props.id);

export const selectCardHand = createCachedSelector(
  selectCardHandByPlayerId,
  (hand) => hand
)((state, props) => props.playerId);

export const getCardIndexForCard = createCachedSelector(
  selectCardHandByPlayerId,
  (_, props) => props, // Ensures that props is received for the combiner
  (hand, props) => {
    return hand.indexOf(props.id); // Important! Looks for index of id, not the card value
  }
)((state, props) => props.id);
