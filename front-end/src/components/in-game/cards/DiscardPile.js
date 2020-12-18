import React from 'react';

import Card from './Card/Card';
import { getDiscardPileTopCardId, selectCard } from '../../../selectors';
import { useSelector } from 'react-redux';
import { getDiscardPileAction } from '../../../selectors';
import CardDisplay from './Card/CardDisplay';
import DiscardPileImage from '../../../assets/images/discardpile_empty.png';
import usePublishMove from './usePublishMove';
import { DISCARD_MOVE } from '../../../constants/gameMoves';
import { ACTIVATE_EFFECT } from '../../../constants/effectMoves';

// Deck pile of the cards discarded or put. Is next to the drawing pile.
// The action performed when clicking on the pile will vary with what state the game is in.
const DiscardPile = (props) => {
  const possibleAction = useSelector(getDiscardPileAction);
  const topCardId = useSelector(getDiscardPileTopCardId);
  let action = null;
  if (possibleAction !== null) {
    if (possibleAction === DISCARD_MOVE) action = 'DISCARD'; // TODO: Find out why this is implemented this way
    if (possibleAction === ACTIVATE_EFFECT) action = ACTIVATE_EFFECT;
  }
  const publishDiscard = usePublishMove(action, { currentPlayerId: props.yourId });

  const determineRender = () => {
    if (topCardId === null || topCardId === undefined) {
      // No card discarded
      return (
        <CardDisplay
          image={DiscardPileImage}
          name={'discard-pile-empty'}
          onClick={publishDiscard}
          value={'Discard Pile'}
        />
      );
    }
    return <Card selector={selectCard} id={topCardId} onClick={publishDiscard} />;
  };
  return determineRender();
};

export default DiscardPile;
