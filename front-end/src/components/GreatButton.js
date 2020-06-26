import useSubscribe from '../api/useSubscribe';
import usePublish from '../api/usePublish';
import React from 'react';

export default (props) => {
  const greatSubscribe = useSubscribe(props.client, '/queue/great');

  const greatPublish = usePublish(props.client, {
    destination: '/app/great',
    body: 'Yo',
  });

  return (
    <div>
      <button onClick={greatPublish}>Publish great</button>
      {greatSubscribe}
    </div>
  );
};
