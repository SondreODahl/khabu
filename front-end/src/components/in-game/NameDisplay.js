import { useSelector } from 'react-redux';
import { getIsPlayersTurn, selectPlayerNameById } from '../../selectors';
import React from 'react';

export default (props) => {
  const isActive = useSelector((state) => getIsPlayersTurn(state, props));
  const userName = useSelector((state) => selectPlayerNameById(state, props));
  return <div className={`user-display ${isActive}`}>{userName}</div>;
};
