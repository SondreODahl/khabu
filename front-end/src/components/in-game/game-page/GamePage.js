import React from 'react';
import { useSelector } from 'react-redux';

import ReadyUpButton from '../game-page/buttons/ReadyUpButton';
import { roundStates } from '../../../reducers/game/roundReducer';
import useSubscribe from '../../../api/useSubscribe';
import usePublish from '../../../api/usePublish';
import { playerJoinedGame } from '../../../actions/playerActions';
import {
  privateActionsDelegator,
  publicActionsDelegator,
  roundActionDelegator,
} from '../../../actions/actionDelegator';
import {
  selectOpponentId,
  selectRoundState,
  selectYourId,
} from '../../../selectors';
import GameInterface from './game-interface/GameInterface';
import WaitingPage from '../waiting-page/WaitingPage';
import GamePageError from './GamePageError';

// Main component for handling a game of khabu. Cycles between states and renders the correct components
// Also subscribes to the relevant channels. Is loaded upon submitting a username.
const GamePage = () => {
  const yourId = useSelector(selectYourId);
  const opponentId = useSelector(selectOpponentId);
  const roundState = useSelector(selectRoundState);
  const publishUserName = usePublish({
    destination: '/app/game/flow',
    body: yourId,
  }); // Will publish the username to everyone when subscribed
  useSubscribe('/topic/game/flow', playerJoinedGame, publishUserName);
  useSubscribe('/topic/round/flow', roundActionDelegator);
  useSubscribe(`/topic/round/actions/${yourId}`, privateActionsDelegator);
  useSubscribe('/topic/round/actions', publicActionsDelegator);

  const determineRender = () => {
    switch (roundState) {
      case roundStates.WAITING_FOR_PLAYERS:
        return <WaitingPage />;
      case roundStates.NOT_STARTED:
        return <ReadyUpButton yourId={yourId} />;
      case roundStates.REVEAL:
      case roundStates.STARTED:
        return (
          <GameInterface yourId={yourId} opponentId={opponentId} roundOver={false} />
        );
      case roundStates.OVER:
        return (
          <GameInterface yourId={yourId} opponentId={opponentId} roundOver={true} />
        );
      default:
        return <GamePageError />;
    }
  };

  return determineRender();
};

export default GamePage;
