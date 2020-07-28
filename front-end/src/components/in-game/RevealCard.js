import usePublish from '../../api/usePublish';
import Card from './Card';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
<<<<<<< HEAD
import { getServerIdForCard, selectCard } from '../../selectors';
=======
import { getServerIdForCard } from '../../selectors';
>>>>>>> master

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
<<<<<<< HEAD
      <Card id={props.id} onClick={publishReveal} selector={selectCard} />
=======
      <Card id={props.id} onClick={publishReveal} />
>>>>>>> master
    </div>
  );
};
