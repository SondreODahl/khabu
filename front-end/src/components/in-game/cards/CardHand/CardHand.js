import { useSelector } from 'react-redux';
import React, { useCallback } from 'react';
import {
  getCardAction,
  getCardActionOpponent,
  selectCardHand,
} from '../../../../selectors';
import './CardHand.css';
import CardWrapper from '../Card/CardWrapper';
import { getParameters } from '../Card/getCardParameters';

export default (props) => {
  const cards = useSelector((state) => selectCardHand(state, props));
  const actionSelector =
    props.playerId === props.yourId ? getCardAction : getCardActionOpponent;
  const possibleAction = useSelector((state) => actionSelector(state));
  const getParametersMemoized = useCallback(getParameters, [possibleAction, props]);
  const { action, parameters } = getParametersMemoized(possibleAction, props);
  const renderCards = () => {
    return cards.map((id) => {
      if (id === null) return <div className={'column'}>{null}</div>;
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