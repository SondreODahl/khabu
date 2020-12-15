import React from 'react';
import { useSelector } from 'react-redux';
import ReadyUpButton from '../buttons/ReadyUpButton';
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
import GameInterface from './GameInterface';
import WaitingPage from './WaitingPage';

const GamePage = () => {
  const yourId = useSelector(selectYourId);
  const opponentId = useSelector(selectOpponentId);
  const roundState = useSelector(selectRoundState);
  const publishUserName = usePublish({
    destination: '/app/game/flow',
    body: yourId,
  });
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
        return <GameInterface yourId={yourId} opponentId={opponentId} />;
      case roundStates.OVER:
        return (
          <GameInterface yourId={yourId} opponentId={opponentId}>
            <ReadyUpButton yourId={yourId} />
          </GameInterface>
        );
      default:
        return <div>Error. Something has gone terribly wrong with Round State</div>;
    }
  };

  return <div>{determineRender()}</div>;
};

export default GamePage;