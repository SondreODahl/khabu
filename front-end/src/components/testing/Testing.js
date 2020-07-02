import React, { useEffect } from 'react';
import GreetButton from './GreetButton';
import ReadyUpButton from './ReadyUpButton';
import { useRESTGet } from '../../api/RESTServer';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default (props) => {
  const url = '/api/hello';
  const { getRESTData } = useRESTGet();
  const data = useSelector((state) => state.get_data);

  useEffect(() => {
    getRESTData(url);
  }, [getRESTData]);

  return (
    <div>
      {data}
      <GreetButton />
      <ReadyUpButton />
      <Link to={'/'}>
        <button className={'ui blue button'}>Home</button>
      </Link>
    </div>
  );
};
