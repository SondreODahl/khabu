import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return (
    <div>
      <div>Enter Username:</div>
      <Link to={'/'}>
        <button>Home</button>
      </Link>
    </div>
  );
};
