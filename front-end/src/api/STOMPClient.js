import React, { useEffect } from 'react';
import useSubscribe from './useSubscribe';
import usePublish from './usePublish';
import useClient from './useClient';
import GreetButtons from '../components/GreetButton';
import GreatButton from '../components/GreatButton';

const STOMPClient = (props) => {
  const client = useClient();

  return (
    <div className={'client body'}>
      {/*       <GreetButtons client={client} /> */}
      <GreatButton client={client} />
    </div>
  );
};

export default STOMPClient;
