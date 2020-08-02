import { selectYourId } from './playerSelectors';
import { createSelector } from 'reselect';

const selectProps = (_, props) => props;
export const selectCurrentPlayer = (state) => state.turn.currentPlayerTurn;
export const selectCurrentPuttingPlayer = (state) => state.turn.currentPuttingPlayer;
export const selectKhabuPlayer = (state) => state.turn.khabuPlayer;
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
