import React from 'react';
import './CardGlow.css';

export default (props) => (
  <div>
    <img
      className={props.name}
      src={props.image}
      alt={props.value}
      onClick={props.onClick}
    />
  </div>
);
