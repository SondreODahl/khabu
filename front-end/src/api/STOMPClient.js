import React from 'react';
import useSubscribe from './useSubscribe';
import usePublish from './usePublish';
import useClient from './useClient';

const STOMPClient = (props) => {
  const client = useClient();
  const greatPublish = usePublish(client, { destination: '/app/great', body: 'Yo' });
  const greetPublish = usePublish(client, {
    destination: '/app/greeting',
    body: 'hello',
  });
  const greetingSubscribe = useSubscribe(client, '/topic/greeting');
  const greatSubscribe = useSubscribe(client, '/queue/great');

  return (
    <div className={'client body'}>
      <div>
        <button onClick={greetPublish}>Publish greet</button>
        <button onClick={greatPublish}>Publish great</button>
        {greetingSubscribe}
        {greatSubscribe}
      </div>
    </div>
  );
};

export default STOMPClient;
