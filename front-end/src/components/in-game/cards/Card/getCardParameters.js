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

const actionDictionary = {
  CHOOSE_CARD: 'CHOOSE_SINGLE_CARD',
  FINISH_USING_EFFECT: 'FINISH_EFFECT',
  PLAYER_CHECK_OTHER: 'CHECK_OPPONENT_CARD',
  PLAYER_CHECK_SELF: 'CHECK_SELF_CARD',
  REVEAL_MOVE: 'REVEAL',
  SWAP_MOVE: 'SWAP',
  TRANSFER_MOVE: 'TRANSFER',
};

// Helper method to determine what parameters should be passed with usePublishMove
const getCardParameters = (possibleAction, props) => {
  let parameters;
  switch (possibleAction) {
    case CHOOSE_CARD:
    case PLAYER_CHECK_OTHER:
    case PLAYER_CHECK_SELF:
    case SWAP_MOVE:
      parameters = {
        currentPlayerId: props.yourId,
        targetPlayerId: props.playerId, // targetPlayerId is not always used
      };
      break;
    case FINISH_USING_EFFECT:
      parameters = {
        currentPlayerId: props.yourId,
        swap: 'false', // TODO: Implement
      };
      break;
    case REVEAL_MOVE:
      parameters = { playerId: props.playerId }; // semantic variable choice. Since there is no currentPLayer
      break;
    case PUT_MOVE:
      parameters = {
        puttingPlayerId: props.yourId, // puttingPlayer isn't necessarily currentPLayer
        targetPlayerId: props.playerId,
      };
      if (props.playerId !== props.yourId)
        return { action: 'PUT_OTHER', parameters };
      else return { action: 'PUT_SELF', parameters };
    case TRANSFER_MOVE:
      parameters = { transferringPlayerId: props.playerId };
      break;
    case null: // NO POSSIBLE MOVE ON THE CARD
      return { action: null, parameters: null };
    default:
      alert(`Error in getCardAction. Returned ${possibleAction}`);
      return;
  }
  return { action: actionDictionary[possibleAction], parameters };
};

export default getCardParameters;
