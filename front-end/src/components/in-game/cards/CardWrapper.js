import usePublish from '../../../api/usePublish';
import Card from './Card';
import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCardAction, getServerIdForCard, selectCard } from '../../../selectors';
import usePublishMove from './usePublishMove';
import {
  PUT_MOVE,
  REVEAL_MOVE,
  SWAP_MOVE,
  TRANSFER_MOVE,
} from '../../../constants/gameMoves';

const getParameters = (possibleAction, props) => {
  switch (possibleAction) {
    case SWAP_MOVE:
      return { action: 'SWAP', parameters: { currentPlayerId: props.playerId } };
    case REVEAL_MOVE:
      return { action: 'REVEAL', parameters: { playerId: props.playerId } }; // TODO: Change to currentPlayerId
    case PUT_MOVE:
      return {
        action: 'PUT_SELF',
        parameters: {
          puttingPlayerId: props.playerId,
        },
      };
    case TRANSFER_MOVE: // NOT IMPLEMENTED YET
    case null: // NO POSSIBLE MOVE ON THE CARD
      return { action: null, parameters: null };
    default:
      alert(`Error in getCardAction. Returned ${possibleAction}`);
  }
};

export default (props) => {
  const possibleAction = useSelector((state) => getCardAction(state));
  const getParametersMemoized = useCallback(getParameters, [possibleAction, props]);
  const { action, parameters } = getParametersMemoized(possibleAction, props);
  const IdInCardHand = useSelector((state) => getServerIdForCard(state, props));
  const publishMove = usePublishMove(action, {
    ...parameters,
    targetCardIndex: IdInCardHand.toString(),
  });
  return (
    <div className={'column'}>
      <Card id={props.id} onClick={publishMove} selector={selectCard} />
    </div>
  );
};
