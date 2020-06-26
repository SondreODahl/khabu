import React, { useState, useEffect } from 'react';
import usePublish from '../api/usePublish';
import useSubscribe from '../api/useSubscribe';

export default (props) => {
  const [ready, setReady] = useState(false);
  const playersReady = useSubscribe(props.client, '/topic/ready');
  const publishToggleReady = usePublish(props.client, {
    destination: '/app/ready',
    body: ready.toString(),
  });

  const buttonMsg = ready ? 'Not Ready' : 'Ready';
  const readyMsg = `${playersReady} players ready`;

  useEffect(() => {
    publishToggleReady();
  }, [ready]);

  return (
    <div>
      {readyMsg}
      <button onClick={() => setReady(!ready)}>{buttonMsg}</button>
    </div>
  );
};
