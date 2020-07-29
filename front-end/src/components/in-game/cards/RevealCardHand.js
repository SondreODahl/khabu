import { useSelector } from 'react-redux';
import React from 'react';
import { selectCardHand } from '../../../selectors';
import RevealCard from './RevealCard';
import './RevealCardHand.css';

export default (props) => {
  const cards = useSelector((state) => selectCardHand(state, props));
  const renderCards = () => {
    return cards.map((id) => {
      return <RevealCard playerId={props.playerId} id={id} key={id} />;
    });
  };
  return <div className={'ui five column grid'}>{renderCards()}</div>;
};
