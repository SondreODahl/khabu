import React from 'react';
import './CardGlow.css';

const CardDisplay = (props) => (
  <div className={'card-display'}>
    <img
      className={props.name}
      src={props.image}
      alt={props.value}
      onClick={props.onClick}
    />
  </div>
);

export default CardDisplay;