import Card from './Card';
import React from 'react';
import { useSelector } from 'react-redux';
import { getServerIdForCard, selectCard } from '../../../../selectors';
import usePublishMove from '../usePublishMove';

export default (props) => {
  const IdInCardHand = useSelector((state) => getServerIdForCard(state, props));
  const publishMove = usePublishMove(props.action, {
    ...props.parameters,
    targetCardIndex: IdInCardHand.toString(),
  });
  return (
    <div className={'column'}>
      <Card id={props.id} onClick={publishMove} selector={selectCard} />
    </div>
  );
};
