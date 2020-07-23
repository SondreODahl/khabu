import usePublish from '../../api/usePublish';
import Card from './Card';
import React from 'react';
import { useSelector } from 'react-redux';
import { getCardIndexForCard } from '../../selectors';

export default (props) => {
  const IdInCardHand = useSelector(getCardIndexForCard(props.playerId));
  const publishReveal = usePublish({
    destination: '/app/round/actions',
    body: {
      action: 'REVEAL',
      playerId: props.playerId,
      targetCardIndex: IdInCardHand,
    },
  });

  return (
    <div>
      <Card id={props.id} onClick={publishReveal} />
    </div>
  );
};
