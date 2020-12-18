import React from 'react';

import Card from '../card/Card';
import {
  getDiscardPileTopCardId,
  selectCard,
  selectYourId,
  getDiscardPileAction,
} from '../../../../../selectors';
import { useSelector } from 'react-redux';
import CardDisplay from '../card/CardDisplay';
import DiscardPileImage from '../../../../../assets/images/discardpile_empty.png';
import usePublishMove from '../usePublishMove';
import { DISCARD_MOVE } from '../../../../../constants/gameMoves';
import { ACTIVATE_EFFECT } from '../../../../../constants/effectMoves';

// Deck pile of the cards discarded or put. Is next to the drawing pile.
// The action performed when clicking on the pile will vary with what state the game is in.
const DiscardPile = () => {
  const possibleAction = useSelector(getDiscardPileAction);
  const topCardId = useSelector(getDiscardPileTopCardId);
  let action = null;
  if (possibleAction !== null) {
    if (possibleAction === DISCARD_MOVE) action = 'DISCARD'; // TODO: Find out why this is implemented this way
    if (possibleAction === ACTIVATE_EFFECT) action = ACTIVATE_EFFECT;
  }
  const yourId = useSelector(selectYourId);
  const publishDiscard = usePublishMove(action, { currentPlayerId: yourId });

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
