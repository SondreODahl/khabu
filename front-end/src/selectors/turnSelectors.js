import { selectYourId } from './index';
import { createSelector } from 'reselect';

export const selectCurrentPlayer = (state) => state.turn.currentPlayerTurn;
export const getIsYourTurn = createSelector(
  selectYourId,
  selectCurrentPlayer,
  (yourId, currentPlayer) => yourId === selectCurrentPlayer.toString() // TODO: Make a string always
);
