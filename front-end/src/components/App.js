import React, { useEffect } from 'react';
import { useRESTServer } from '../api/RESTServer';
import { useSelector } from 'react-redux';
import useClient from '../api/useSTOMPClient';
import GreetButton from './GreetButton';
import ReadyUpButton from './ReadyUpButton';

const App = () => {
  const url = '/api/hello';
  useClient();
  const { getRESTData } = useRESTServer();
  const data = useSelector((state) => state.data);

  useEffect(() => {
    getRESTData(url);
  }, [getRESTData]);

  return (
    <div>
      {data}
      <GreetButton />
      <ReadyUpButton />
    </div>
  );
};

export default App;
