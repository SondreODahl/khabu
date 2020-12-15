import Card from './Card';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  getCardAction,
  getCardActionOpponent,
  getServerIdForCard,
  selectCard,
} from '../../../../selectors';
import usePublishMove from '../usePublishMove';
import getCardParameters from './getCardParameters';

const CardWrapper = (props) => {
  const actionSelector =
    props.playerId === props.yourId ? getCardAction : getCardActionOpponent;
  const possibleAction = useSelector((state) => actionSelector(state));
  const getParametersMemoized = useCallback(getCardParameters, [possibleAction, props]);
  const { action, parameters } = getParametersMemoized(possibleAction, props);
  const IdInCardHand = useSelector((state) => getServerIdForCard(state, props));
  const publishMove = usePublishMove(action, {
    ...parameters,
    targetCardIndex: IdInCardHand.toString(),
  });
  console.log(props.parameters);
  return (
    <div className={'column'}>
      <Card id={props.id} onClick={publishMove} selector={selectCard} />
    </div>
  );
};

export default CardWrapper;