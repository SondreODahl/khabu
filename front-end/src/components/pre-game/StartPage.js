import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <Link to={'/join'}>
        <button>Join</button>
      </Link>
      <Link to={'/test'}>
        <button>Test</button>
      </Link>
    </div>
  );
};
