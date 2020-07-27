import { DRAW, FIRST_TURN } from '../reducers/game/gameStates';
import { getIsYourTurn } from './turnSelectors';

const selectGameState = (state) => state.gameState;

export const canDrawCard = createSelector(
  selectGameState,
  getIsYourTurn,
  (gameState, yourTurn) => {
    if (gameState === FIRST_TURN || gameState === DRAW) return yourTurn;
    else return false;
  }
);
