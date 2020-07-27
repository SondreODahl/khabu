import usePublish from '../../api/usePublish';
import Card from './Card';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default (props) => {
  const IdInCardHand = useSelector();
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
    <div>
      <Card id={props.id} onClick={publishReveal} />
    </div>
  );
};
