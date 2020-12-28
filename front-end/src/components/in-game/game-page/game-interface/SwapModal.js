import React from 'react';
import { useSelector } from 'react-redux';
import { FINISH_EFFECT } from '../../../../actions/types';
import { selectYourId } from '../../../../selectors';
import usePublishMove from '../cards/usePublishMove';
import './SwapModal.css';

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
    <div className="swap-modal">
      <p>Swap?</p>
      <button className="ui button red" onClick={publishFalse}>
        No
      </button>
      <button className="ui button green" onClick={publishTrue}>
        Yes
      </button>
    </div>
  );
};

export default SwapModal;
