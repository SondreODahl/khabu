import React from 'react';
import { useSelector } from 'react-redux';
import CardDisplay from './CardDisplay';

export default (props) => {
  const value = useSelector((state) => props.selector(state, props));
  const imageValue = value === null ? 'red_back' : value;
  const image = require(`../../../assets/images/${imageValue}.png`);
  return <CardDisplay image={image} value={value} onClick={props.onClick} />;
};
