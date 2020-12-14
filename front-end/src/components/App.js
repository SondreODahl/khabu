import React from 'react';
import { Route } from 'react-router-dom';

import useClient from '../api/useSTOMPClient';
import Testing from './testing/Testing';
import JoinGamePage from './pre-game/JoinGamePage';
import StartPage from './pre-game/StartPage';
import GamePage from './in-game/pages/GamePage';
import RulesPage from './pre-game/RulesPage';

const App = () => {
  useClient();
  return (
    <div
      className={'app'}
      style={{ marginRight: '20%', marginLeft: '20%', height: '100vh' }}
    >
      <Route path={'/'} exact component={StartPage} />
      <Route path={'/test'} component={Testing} />
      <Route path={'/join'} component={JoinGamePage} />
      <Route path={'/game'} component={GamePage} />
      <Route path={'/rules'} component={RulesPage} />
    </div>
  );
};

export default App;
