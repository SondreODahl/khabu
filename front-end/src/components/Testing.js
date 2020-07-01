import React, { useEffect } from 'react';
import GreetButton from './GreetButton';
import ReadyUpButton from './ReadyUpButton';
import { useRESTServer } from '../api/RESTServer';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default (props) => {
  const url = '/api/hello';
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
      <Link to={'/'}>
        <button>Home</button>
      </Link>
    </div>
  );
};
