import { useSelector } from 'react-redux';
import Card from './Card';
import React from 'react';
import { selectCardHand } from '../../selectors';
import RevealCard from './RevealCard';

export default (props) => {
  const cards = useSelector((state) => selectCardHand(state, props));
  const renderCards = () => {
    return cards.map((id) => {
      return <RevealCard playerId={props.playerId} id={id} />;
    });
  };

  return <div>{renderCards()}</div>;
};
