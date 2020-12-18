import React from 'react';
import './CardDisplay.css';

// Pure function component for displaying values.
const CardDisplay = ({ name, image, value, onClick }) => (
  <img className={`card-display ${name}`} src={image} alt={value} onClick={onClick} />
);

export default CardDisplay;
