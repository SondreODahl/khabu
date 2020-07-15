import React, { useEffect } from 'react';
import usePublish from '../../api/usePublish';
import useSubscribe from '../../api/useSubscribe';
import { useSelector, useDispatch } from 'react-redux';
import { toggleReady, updatePlayersReady } from '../../actions';
import { initializeRound } from '../../actions';

export default (props) => {
  const dispatch = useDispatch();
  const subDest = '/topic/ready';
  const playersReady = useSelector((state) => state.ready.totalReady);
  const ready = useSelector((state) => state.ready.playerReady);
  const playerCap = useSelector((state) => state.game.playerCapacity);
  const publishToggleReady = usePublish({
    destination: '/app/ready',
    body: ready.toString(), // Can be optimized
  });

  useSubscribe(subDest, updatePlayersReady);

  if (playersReady === playerCap) {
    dispatch(initializeRound());
  }

  const buttonClassName = ready ? 'active' : 'inactive';
  const readyMsg = `${playersReady} players ready`;

  useEffect(() => {
    publishToggleReady();
    // eslint-disable-next-line
  }, [ready]);

  return (
    <div>
      <button
        className={`ui toggle button ${buttonClassName}`}
        onClick={() => dispatch(toggleReady())}
      >
        Ready
      </button>
      {readyMsg}
    </div>
  );
};
