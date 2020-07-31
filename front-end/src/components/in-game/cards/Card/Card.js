import React from 'react';
import { useSelector } from 'react-redux';
import { selectCardGlow } from '../../../../selectors';
import CardDisplay from './CardDisplay';

export default (props) => {
  const value = useSelector((state) => props.selector(state, props));
  const glow = useSelector((state) => selectCardGlow(state, props));
  console.log(`Glow: ${glow}`);
  const imageValue = value === null ? 'red_back' : value;
  const image = require(`../../../../assets/images/${imageValue}.png`);
  const name = glow ? 'glow' : '';
  return (
    <CardDisplay image={image} value={value} onClick={props.onClick} name={name} />
  );
};
