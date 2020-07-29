import { useSelector } from 'react-redux';
import React, { useCallback } from 'react';
import { selectCardHand } from '../../../selectors';
import RevealCard from './CardWrapper';
import './CardHand.css';
import { getCardAction } from '../../../selectors/gameStateSelectors';
import {
  PUT_MOVE,
  REVEAL_MOVE,
  SWAP_MOVE,
  TRANSFER_MOVE,
} from '../../../constants/gameMoves';
import CardWrapper from './CardWrapper';

const getParameters = (possibleAction, props) => {
  switch (possibleAction) {
    case SWAP_MOVE:
      return { currentPlayerId: props.playerId };
    case REVEAL_MOVE:
      return { playerId: props.playerId }; // TODO: Change to currentPlayerId
    case PUT_MOVE: // NOT IMPLEMENTED YET
    case TRANSFER_MOVE: // NOT IMPLEMENTED YET
    case null: // NO POSSIBLE MOVE ON THE CARD
      return {};
    default:
      alert(`Error in getCardAction. Returned ${possibleAction}`);
  }
};

export default (props) => {
  const cards = useSelector((state) => selectCardHand(state, props));
  const possibleAction = useSelector((state) => getCardAction(state));
  const getParametersMemoized = useCallback(getParameters, [possibleAction, props]);
  const renderCards = () => {
    return cards.map((id) => {
      return (
        <CardWrapper
          action={possibleAction}
          parameters={getParametersMemoized(possibleAction, props)}
          playerId={props.playerId}
          id={id}
          key={id}
        />
      );
    });
  };
  return <div className={'ui five column grid'}>{renderCards()}</div>;
};
