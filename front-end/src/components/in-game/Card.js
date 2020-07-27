import React from 'react';
import { useSelector } from 'react-redux';
import { selectCard } from '../../selectors';

export default (props) => {
  const value = useSelector((state) => selectCard(state, props));
  const imageValue = value === null ? 'red_back' : value;
  const image = require(`../../assets/images/${imageValue}.png`);
  return (
    <div onClick={props.onClick}>
      <img src={image} alt={value} style={{ width: '120px', height: '200px' }} />
    </div>
  );
};
