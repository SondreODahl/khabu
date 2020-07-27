import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

const selectAllCards = (state) => state.cards.byId;
const selectCardById = (state, props) => state.cards.byId[props.id];
const selectCardHandByPlayerId = (state, props) => state.cards[props.playerId];
const selectProps = (_, props) => props;

export const selectCard = createCachedSelector(
  selectCardById,
  selectProps,
  (card) => card
)((state, props) => props.id);

export const selectCardHand = createCachedSelector(
  selectCardHandByPlayerId,
  selectProps,
  (hand) => hand
)((state, props) => props.playerId);

export const getCardIndexForCard = createCachedSelector(
  selectCardHandByPlayerId,
  selectProps,
  (hand, props) => {
    return hand.indexOf(props.id); // Important! Looks for index of id, not the card value
  }
)((state, props) => props.id);
