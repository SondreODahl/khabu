import React, { useEffect } from 'react';
import usePublish from '../../api/usePublish';
import useSubscribe from '../../api/useSubscribe';
import { useSelector, useDispatch } from 'react-redux';
import { startRound, toggleReady, updatePlayersReady } from '../../actions';
import { initializeRound } from '../../actions';

export default (props) => {
  const dispatch = useDispatch();
  const playersReady = useSelector((state) => state.ready.totalReady);
  const ready = useSelector((state) => state.ready.playerReady);
  const playerCap = useSelector((state) => state.game.playerCapacity);
  const publishToggleReady = usePublish({
    destination: '/app/ready',
    body: ready.toString(), // Can be optimized
  });
  useSubscribe('/topic/ready', updatePlayersReady);

  useEffect(() => {
    if (playersReady === playerCap) {
      dispatch(initializeRound());
    }
  });

  useEffect(() => {
    publishToggleReady();
    // eslint-disable-next-line
  }, [ready]);

  useEffect(
    () => () => {
      setTimeout(() => dispatch(startRound()), props.TIMEOUT);
    },
    []
  );

  const buttonClassName = ready ? 'active' : 'inactive';
  const readyMsg = `${playersReady} players ready`;
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
