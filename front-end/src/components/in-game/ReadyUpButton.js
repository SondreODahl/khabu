import React, { useEffect } from 'react';
import usePublish from '../../api/usePublish';
import useSubscribe from '../../api/useSubscribe';
import { useSelector, useDispatch } from 'react-redux';
import { startRound, toggleReady, updatePlayersReady } from '../../actions';
import { initializeRound } from '../../actions';

export default (props) => {
  const dispatch = useDispatch();
  const playersReady = useSelector((state) => state.round.ready.totalReady);
  const ready = useSelector((state) => state.round.ready.playerReady);
  const playerCap = useSelector((state) => state.players.playerCapacity);
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
      setTimeout(() => dispatch(startRound(1)), props.TIMEOUT); // Set the length of reveal time
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
