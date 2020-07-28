import usePublish from '../../../api/usePublish';
import Card from './Card';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getServerIdForCard, selectCard } from '../../../selectors';

export default (props) => {
  const IdInCardHand = useSelector((state) => getServerIdForCard(state, props));
  const json = {
    action: 'REVEAL',
    playerId: props.playerId.toString(),
    targetCardIndex: IdInCardHand.toString(),
  };
  const publishReveal = usePublish({
    destination: '/app/round/actions',
    body: JSON.stringify(json),
  });

  return (
    <div className={'column'}>
      <Card id={props.id} onClick={publishReveal} selector={selectCard} />
    </div>
  );
};
