import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <Link to={'/join'}>
        <button className={'ui teal button'}>Join</button>
      </Link>
      <Link to={'/test'}>
        <button className={'ui teal button'}>Test</button>
      </Link>
    </div>
  );
};
