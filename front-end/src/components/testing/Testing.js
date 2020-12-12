import React, { useEffect } from 'react';
import ReadyUpButton from '../in-game/buttons/ReadyUpButton';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TestCardReveal from './TestCardReveal';

export default () => {
  const url = '/api/hello';
  return (
    <div>
      <Link to={'/'}>
        <button className={'ui blue button'}>Home</button>
      </Link>
      <div className={'ui hidden divider'} />
      <div className={'ui two column relaxed grid'}>
        <div className={'column'}>
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
