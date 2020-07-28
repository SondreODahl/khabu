import React from 'react';
import Card from './Card';
import { getDiscardPileTopCard, selectDiscardPileLength } from '../../../selectors';
import { useSelector } from 'react-redux';
import { getDiscardPileAction } from '../../../selectors/gameStateSelectors';
import CardDisplay from './CardDisplay';
import DiscardPileImage from '../../../assets/images/discardpile_empty.png';

export default () => {
  const possibleAction = useSelector(getDiscardPileAction);
  const length = useSelector(selectDiscardPileLength);
  if (length === 0)
    return (
      <div>
        <CardDisplay
          onClick={null}
          value={'Discard Pile'}
          image={DiscardPileImage}
        />
        {possibleAction}
      </div>
    );
  return (
    <div className={'discard-pile'}>
      <Card selector={getDiscardPileTopCard} />
      {possibleAction}
    </div>
  );
};
