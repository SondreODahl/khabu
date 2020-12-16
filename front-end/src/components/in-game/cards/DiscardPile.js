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

const DiscardPile = (props) => {
  const possibleAction = useSelector(getDiscardPileAction);
  const id = useSelector(getDiscardPileTopCardId);
  const discardParams = { currentPlayerId: props.yourId };
  let action = null;
  if (possibleAction !== null) {
    if (possibleAction === DISCARD_MOVE) action = 'DISCARD';
    if (possibleAction === ACTIVATE_EFFECT) action = ACTIVATE_EFFECT;
  }
  const onClick = usePublishMove(action, discardParams);
  if (id === null || id === undefined) {
    return (
      <div>
        <CardDisplay
          onClick={onClick}
          value={'Discard Pile'}
          image={DiscardPileImage}
        />
      </div>
    );
  } else {
    return (
      <div className={'discard-pile'}>
        <Card selector={selectCard} id={id} onClick={onClick} />
      </div>
    );
  }
};

export default DiscardPile;