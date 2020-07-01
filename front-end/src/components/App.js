import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Router, Route, Link, BrowserRouter } from 'react-router-dom';

import useClient from '../api/useSTOMPClient';
import Testing from './Testing';
import JoinGame from './pre-game/JoinGame';
import StartPage from './pre-game/StartPage';

const App = (props) => {
  useClient();
  return (
    <div>
      <Route path={'/'} exact component={StartPage} />
      <Route path={'/test'} component={Testing} />
      <Route path={'/join'} component={JoinGame} />
    </div>
  );
};

export default App;
