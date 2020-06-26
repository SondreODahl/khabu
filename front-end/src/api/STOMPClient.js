import React from 'react';
import useSubscribe from './useSubscribe';
import usePublish from './usePublish';

const STOMPClient = (props) => {
  const greetParameters = { destination: '/app/greeting', body: 'hello' };
  const greatPublish = usePublish({ destination: '/app/great', body: 'Yo' });
  const greetPublish = usePublish(greetParameters);
  const greetingSubscribe = useSubscribe('/topic/greeting');
  const greatSubscribe = useSubscribe('/queue/great');

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
