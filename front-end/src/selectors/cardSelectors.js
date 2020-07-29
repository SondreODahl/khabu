import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

const selectAllCards = (state) => state.cards.byId;
const selectCardValueById = (state, props) => state.cards.byId[props.id];
const selectCardHandByPlayerId = (state, props) => state.cards[props.playerId];

const selectDiscardPile = (state) => state.cards.discardPile;
export const selectDiscardPileLength = (state) => state.cards.discardPile.length;
export const getDiscardPileTopCardId = createSelector(
  selectDiscardPileLength,
  selectDiscardPile,
  (length, pile) => {
    if (length === 0) return null;
    else return pile[length - 1];
  }
);

const selectProps = (_, props) => props;

export const selectCardGlow = createCachedSelector(
  selectCardValueById,
  (card) => card.glow
)((state, props) => props.id);

export const selectCard = createCachedSelector(
  selectCardValueById,
  (card) => card.value
)((state, props) => props.id);

export const selectCardHand = createCachedSelector(
  selectCardHandByPlayerId,
  (hand) => hand
)((state, props) => props.playerId);

export const getServerIdForCard = createCachedSelector(
  selectCardHandByPlayerId,
  selectProps,
  (hand, props) => {
    return hand.indexOf(props.id) + 1; // Important! Looks for index of id, not the card value
    // Server Id is 1-indexed
  }
)((state, props) => props.id);
