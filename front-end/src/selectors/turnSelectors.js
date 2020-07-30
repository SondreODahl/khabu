import { selectPlayer, selectYourId } from './playerSelectors';
import { selectProps } from './index';
import { createSelector } from 'reselect';

export const selectCurrentPlayer = (state) => state.turn.currentPlayerTurn;
export const selectCurrentPuttingPlayer = (state) => state.turn.currentPuttingPlayer;
export const getIsYourTurn = createSelector(
  selectYourId,
  selectCurrentPlayer,
  (yourId, currentPlayer) => yourId === currentPlayer // TODO: Make a string always
);
export const getAreYouCurrentPuttingPlayer = createSelector(
  selectYourId,
  selectCurrentPuttingPlayer,
  (yourId, puttingPlayer) => yourId === puttingPlayer
);

export const getIsPlayersTurn = createSelector(
  selectCurrentPlayer,
  selectProps,
  (currentPlayer, props) => currentPlayer === props.playerId
);
