import usePublishMove from './cards/usePublishMove';
import React from 'react';

export default (props) => {
  const publishEndTurn = usePublishMove('END_TURN', {
    currentPlayerId: props.yourId,
  });
  return (
    <div>
      <button onClick={publishEndTurn}>End Turn</button>
    </div>
  );
};
