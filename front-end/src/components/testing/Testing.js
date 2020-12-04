import React, { useEffect } from 'react';
import GreetButton from './GreetButton';
import ReadyUpButton from '../in-game/buttons/ReadyUpButton';
import { useRESTGet } from '../../api/RESTServer';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TestCardReveal from './TestCardReveal';

export default () => {
  const url = '/api/hello';
  const { getRESTData } = useRESTGet();
  const data = useSelector((state) => state.api.get_data);

  useEffect(() => {
    getRESTData(url);
  }, [getRESTData]);

  return (
    <div>
      <Link to={'/'}>
        <button className={'ui blue button'}>Home</button>
      </Link>
      <div className={'ui hidden divider'} />
      <div className={'ui two column relaxed grid'}>
        <div className={'column'}>
          <GreetButton />
          {data}
        </div>
        <div className={'column'}>
          <ReadyUpButton />
        </div>
      </div>
      <div>
        <TestCardReveal />
      </div>
    </div>
  );
};
