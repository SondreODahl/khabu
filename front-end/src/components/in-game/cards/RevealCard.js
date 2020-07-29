import usePublish from '../../../api/usePublish';
import Card from './Card';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getServerIdForCard, selectCard } from '../../../selectors';
import usePublishMove from './usePublishMove';

export default (props) => {
  const IdInCardHand = useSelector((state) => getServerIdForCard(state, props));
  const publishReveal = usePublishMove('REVEAL', {
    playerId: props.playerId.toString(),
    targetCardIndex: IdInCardHand.toString(),
  });
  return (
    <div className={'column'}>
      <Card id={props.id} onClick={publishReveal} selector={selectCard} />
    </div>
  );
};
