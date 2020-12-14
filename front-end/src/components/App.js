import React from 'react';
import { Route } from 'react-router-dom';

import useClient from '../api/useSTOMPClient';
import Testing from './testing/Testing';
import JoinGame from './pre-game/JoinGame';
import StartPage from './pre-game/StartPage';
import GamePage from './in-game/pages/GamePage';
import RulesPage from './pre-game/RulesPage';

const App = () => {
  useClient();
  return (
    <div className={'ui centered container'}>
      <Route path={'/'} exact component={StartPage} />
      <Route path={'/test'} component={Testing} />
      <Route path={'/join'} component={JoinGame} />
      <Route path={'/game'} component={GamePage} />
      <Route path={'/rules'} component={RulesPage} />
    </div>
  );
};

export default App;
