import usePublish from '../../api/usePublish';
import Card from './Card';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCardIndexForCard } from '../../selectors';

export default (props) => {
  const IdInCardHand = useSelector((state) => getCardIndexForCard(state, props));
  const json = {
    action: 'REVEAL',
    playerId: props.playerId,
    targetCardIndex: IdInCardHand,
  };
  const publishReveal = usePublish({
    destination: '/app/round/actions',
    body: JSON.stringify(json),
  });

  return (
    <div onClick={publishReveal}>
      <Card id={props.id} />
    </div>
  );
};
