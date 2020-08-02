import {
  PUT_MOVE,
  REVEAL_MOVE,
  SWAP_MOVE,
  TRANSFER_MOVE,
} from '../../../../constants/gameMoves';

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
    case null: // NO POSSIBLE MOVE ON THE CARD
      return { action: null, parameters: null };
    default:
      alert(`Error in getCardAction. Returned ${possibleAction}`);
  }
};
