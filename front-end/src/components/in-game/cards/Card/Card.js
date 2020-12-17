import React from 'react';
import { useSelector } from 'react-redux';
import { selectCardGlow } from '../../../../selectors';
import CardDisplay from './CardDisplay';

// Generalized card component. Determines whether the card glows and its image.
const Card = (props) => {
  const shouldGlow = useSelector((state) => selectCardGlow(state, props));
  const className = shouldGlow ? 'glow' : '';
  
  const value = useSelector((state) => props.selector(state, props));
  const imageValue = value === null ? 'red_back' : value;
  const image = require(`../../../../assets/images/${imageValue}.png`);
  return (
    <CardDisplay
      image={image}
      value={value}
      onClick={props.onClick}
      name={`card ${className}`}
    />
  );
};

export default Card;
