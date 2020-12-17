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

// Wrapper component for Card component. Determines the onClick action.
const CardWrapper = (props) => {
  const actionSelector =
    props.playerId === props.yourId ? getCardAction : getCardActionOpponent;
  const possibleAction = useSelector((state) => actionSelector(state));
  const getParametersMemoized = useCallback(getCardParameters, [
    possibleAction,
    props,
  ]); // This should not change too often. Only on giving cards.
  console.log(possibleAction);
  const { action, parameters } = getParametersMemoized(possibleAction, props);
  const serverCardIndex = useSelector((state) => getServerIdForCard(state, props)); 
  const publishMove = usePublishMove(action, {
    ...parameters,
    targetCardIndex: serverCardIndex.toString(),
  });
  return <Card id={props.id} onClick={publishMove} selector={selectCard} />;
};

export default CardWrapper;
