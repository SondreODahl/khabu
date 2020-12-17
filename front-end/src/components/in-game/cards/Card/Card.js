import React from 'react';
import { useSelector } from 'react-redux';
import { selectCardGlow } from '../../../../selectors';
import CardDisplay from './CardDisplay';

// Generalized card component. Determines whether the card glows and its image. 
const Card = (props) => {
  const value = useSelector((state) => props.selector(state, props));
  const glow = useSelector((state) => selectCardGlow(state, props));
  const shouldGlow = glow ? 'glow' : '';
  const imageValue = value === null ? 'red_back' : value;
  const image = require(`../../../../assets/images/${imageValue}.png`);
  return (
    <CardDisplay
      image={image}
      value={value}
      onClick={props.onClick}
      name={`card ${shouldGlow}`}
    />
  );
};

export default Card;