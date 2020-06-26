import React from 'react';
import usePublish from '../api/usePublish';
import useSubscribe from '../api/useSubscribe';

export default (props) => {
  const greetingSubscribe = useSubscribe(props.client, '/topic/greeting');

  const greetPublish = usePublish(props.client, {
    destination: '/app/greeting',
    body: 'hello',
  });

  return (
    <div className={'props.client body'}>
      <div>
        <button onClick={greetPublish}>Publish greet</button>
        {greetingSubscribe}
      </div>
    </div>
  );
};
