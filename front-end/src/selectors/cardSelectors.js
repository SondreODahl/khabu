import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

const selectProps = (_, props) => props;
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

// Gets card by their id and determines whether they glow or not
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

// Gets corresponding server Id for a cardId. ServerId is based on index.
export const getServerIdForCard = createCachedSelector(
  selectCardHandByPlayerId,
  selectProps,
  (hand, props) => {
    return hand.indexOf(props.id); // Important! Looks for index of id, not the card value
  }
)((state, props) => props.id);
