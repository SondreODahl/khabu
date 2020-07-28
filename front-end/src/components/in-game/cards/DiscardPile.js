import React from 'react';
import Card from './Card';
import { getDiscardPileTopCardId, selectCard } from '../../../selectors';
import { useSelector } from 'react-redux';
import { getDiscardPileAction } from '../../../selectors/gameStateSelectors';
import CardDisplay from './CardDisplay';
import DiscardPileImage from '../../../assets/images/discardpile_empty.png';
import useAction from './useAction';

export default (props) => {
  const possibleAction = useSelector(getDiscardPileAction);
  const id = useSelector(getDiscardPileTopCardId);
  const discardParams = { currentPlayerId: props.yourId };
  const discard = useAction('DISCARD', discardParams);

  if (!id)
    // Empty pile
    return (
      <div>
        <CardDisplay
          onClick={discard}
          value={'Discard Pile'}
          image={DiscardPileImage}
        />
      </div>
    );
  return (
    // There is a card on the pile
    <div className={'discard-pile'}>
      <Card selector={selectCard} id={id} />
    </div>
  );
};
