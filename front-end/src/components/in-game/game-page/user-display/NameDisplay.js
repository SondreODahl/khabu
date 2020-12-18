import { useSelector } from 'react-redux';
import { getIsPlayersTurn, selectPlayerNameById } from '../../../../selectors';
import React from 'react';
import './NameDisplay.css';
import ScoreDisplay from './ScoreDisplay';

// Receives an Id and displays the name and whether it's their turn. Shows score as well.
const NameDisplay = (props) => {
  const isActive = useSelector((state) => getIsPlayersTurn(state, props));
  const userName = useSelector((state) => selectPlayerNameById(state, props));
  const className = isActive ? 'glow' : ''; // Glows when user's turn
  return (
    <div className={'name-display'}>
      <h2 className={`username-text ${className}`}>{userName}</h2>
      <ScoreDisplay playerId={props.playerId}/>
    </div>
  );
};

export default NameDisplay;
