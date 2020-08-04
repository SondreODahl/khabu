import React from 'react';
import './CardGlow.css';

export default (props) => (
  <div className={'card-display'}>
    <img
      className={props.name}
      src={props.image}
      alt={props.value}
      onClick={props.onClick}
    />
  </div>
);
