import {
  PUT_MOVE,
  REVEAL_MOVE,
  SWAP_MOVE,
  TRANSFER_MOVE,
} from '../../../../constants/gameMoves';
import {
  CHOOSE_CARD,
  FINISH_USING_EFFECT,
  PLAYER_CHECK_OTHER,
  PLAYER_CHECK_SELF,
} from '../../../../constants/effectMoves';

export const getParameters = (possibleAction, props) => {
  switch (possibleAction) {
    case SWAP_MOVE:
      return { action: 'SWAP', parameters: { currentPlayerId: props.playerId } };
    case REVEAL_MOVE:
      return { action: 'REVEAL', parameters: { playerId: props.playerId } }; // TODO: Change to currentPlayerId
    case PUT_MOVE:
      if (props.playerId !== props.yourId)
        return {
          action: 'PUT_OTHER',
          parameters: {
            puttingPlayerId: props.yourId,
            targetPlayerId: props.playerId,
          },
        };
      else
        return {
          action: 'PUT_SELF',
          parameters: {
            puttingPlayerId: props.playerId,
          },
        };
    case TRANSFER_MOVE:
      return {
        action: 'TRANSFER',
        parameters: { transferringPlayerId: props.playerId },
      };
    case CHOOSE_CARD:
      return {
        action: 'CHOOSE_SINGLE_CARD',
        parameters: {
          currentPlayerId: props.yourId,
          targetPlayerId: props.playerId,
        },
      };
    case PLAYER_CHECK_OTHER:
      return {
        action: 'CHECK_OPPONENT_CARD',
        parameters: {
          currentPlayerId: props.yourId,
          targetPlayerId: props.playerId,
        },
      };
    case PLAYER_CHECK_SELF:
      return {
        action: 'CHECK_SELF_CARD',
        parameters: { currentPlayerId: props.yourId },
      };
    case FINISH_USING_EFFECT:
      return {
        action: 'FINISH_EFFECT',
        parameters: {
          currentPlayerId: props.yourId,
          swap: 'false',
        },
      };
    case null: // NO POSSIBLE MOVE ON THE CARD
      return { action: null, parameters: null };
    default:
      alert(`Error in getCardAction. Returned ${possibleAction}`);
  }
};
