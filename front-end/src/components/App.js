import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Router, Route, Link, BrowserRouter } from 'react-router-dom';
import useClient from '../api/useSTOMPClient';
import Testing from './Testing';
import JoinGame from './pre-game/JoinGame';

const App = (props) => {
  useClient();
  return (
    <div>
      <Link to={'/join'}>
        <button>Join</button>
      </Link>
      <Link to={'/test'}>
        <button>Test</button>
      </Link>
      <Route path={'/test'} component={Testing} />
      <Route path={'/join'} component={JoinGame} />
    </div>
  );
};

export default App;
