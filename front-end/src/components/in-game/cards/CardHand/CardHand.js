import { useSelector } from 'react-redux';
import React, { useCallback } from 'react';
import { getCardAction, selectCardHand } from '../../../../selectors';
import './CardHand.css';
import CardWrapper from '../Card/CardWrapper';
import { getParameters, getParametersOpponent } from '../Card/getCardParameters';

export default (props) => {
  const cards = useSelector((state) => selectCardHand(state, props));
  const opponent = props.playerId !== props.yourId;
  const { actionSelector, parametersFunction } = opponent
    ? { getCardActionOpponent, getParametersOpponent }
    : { getCardAction, getParameters };
  const possibleAction = useSelector((state) => actionSelector(state));
  const getParametersMemoized = useCallback(parametersFunction, [
    possibleAction,
    props,
  ]);
  const { action, parameters } = getParametersMemoized(possibleAction, props);
  const renderCards = () => {
    return cards.map((id) => {
      return (
        <CardWrapper
          action={action}
          parameters={parameters}
          playerId={props.playerId}
          id={id}
          key={id}
        />
      );
    });
  };
  return <div className={'ui five column grid'}>{renderCards()}</div>;
};
