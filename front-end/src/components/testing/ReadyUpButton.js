import React, { useEffect } from 'react';
import usePublish from '../../api/usePublish';
import useSubscribe from '../../api/useSubscribe';
import { useSelector, useDispatch } from 'react-redux';
import { toggleReady } from '../../actions';

export default (props) => {
  const dispatch = useDispatch();
  const subDest = '/topic/ready';
  const playersReady = useSelector((state) => state.subscription[subDest]);
  const ready = useSelector((state) => state.game.ready);
  const publishToggleReady = usePublish({
    destination: '/app/ready',
    body: ready.toString(), // Can be optimized
  });

  useSubscribe(subDest);

  const buttonMsg = ready ? 'Not Ready' : 'Ready';
  const readyMsg = `${playersReady} players ready`;

  useEffect(() => {
    publishToggleReady();
    // eslint-disable-next-line
  }, [ready]);

  return (
    <div>
      {readyMsg}
      <button onClick={() => dispatch(toggleReady())}>{buttonMsg}</button>
    </div>
  );
};
