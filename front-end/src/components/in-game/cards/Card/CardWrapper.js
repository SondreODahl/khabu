import usePublish from '../../../api/usePublish';
import Card from './Card';
import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCardAction, getServerIdForCard, selectCard } from '../../../selectors';
import usePublishMove from './usePublishMove';

export default (props) => {
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
