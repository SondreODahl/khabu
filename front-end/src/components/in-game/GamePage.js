import React from 'react';
import { useSelector } from 'react-redux';
import ReadyUpButton from './ReadyUpButton';
import { roundStates } from '../../reducers/game/roundReducer';
import RevealCardHand from './RevealCardHand';
import useSubscribe from '../../api/useSubscribe';
import usePublish from '../../api/usePublish';
import { playerJoinedGame } from '../../actions/playerActions';
import { roundActionDelegator } from '../../actions/actionDelegator';

export default () => {
  const yourId = useSelector((state) => state.players.yourId);
  const roundState = useSelector((state) => state.round.currentState);
  const publishUserName = usePublish({
    destination: '/app/game/flow',
    body: yourId,
  });
  useSubscribe('/topic/game/flow', playerJoinedGame, publishUserName);
  useSubscribe('/topic/round/flow', roundActionDelegator, undefined);

  const determineRender = () => {
    switch (roundState) {
      case roundStates.WAITING_FOR_PLAYERS:
        return <div>Waiting for other players...</div>;
      case roundStates.NOT_STARTED:
        return (
          <div>
            <ReadyUpButton yourId={yourId} />
          </div>
        );
      case roundStates.INITIALIZING:
        return (
          <div>
            <h1>Initializing</h1>
            <RevealCardHand />
          </div>
        );
      case roundStates.STARTED:
        return <h1>Started</h1>;
      case roundStates.OVER:
        return <h1>Over</h1>;
      default:
        return <div>Error. Something has gone terribly wrong with Round State</div>;
    }
  };

  return <div>{determineRender()}</div>;
};
