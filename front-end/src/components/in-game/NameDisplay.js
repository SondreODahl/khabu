import { useSelector } from 'react-redux';
import { getIsPlayersTurn, selectPlayerNameById } from '../../selectors';
import React from 'react';
import './NameDisplay.css';

export default (props) => {
  const isActive = useSelector((state) => getIsPlayersTurn(state, props));
  const className = isActive ? 'glow' : '';
  const userName = useSelector((state) => selectPlayerNameById(state, props));
  return <h2 className={`ui centered user-display ${className}`}>{userName}</h2>;
};