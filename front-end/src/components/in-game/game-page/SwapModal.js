import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FINISH_EFFECT } from '../../../actions/types';
import { selectYourId, shouldModalRender } from '../../../selectors';
import usePublishMove from './cards/usePublishMove';

const SwapModal = () => {
  // TODO: Make only clickable once
  const currentPlayerId = useSelector(selectYourId); // Will only show on your turn
  const publishTrue = usePublishMove(FINISH_EFFECT, {
    currentPlayerId,
    swap: 'true',
  });
  const publishFalse = usePublishMove(FINISH_EFFECT, {
    currentPlayerId,
    swap: 'false',
  });
  return (
    <div>
      <p>Swap?</p>
      <button onClick={publishFalse}>No</button>
      <button onClick={publishTrue}>Yes</button>
    </div>
  );
};

export default SwapModal;
