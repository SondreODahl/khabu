import React from 'react';
import './CardGlow.css';

export default (props) => (
  <div onClick={props.onClick}>
    <img className={props.name} src={props.image} alt={props.value} />
  </div>
);
