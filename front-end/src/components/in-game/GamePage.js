import React from 'react';
import { useSelector } from 'react-redux';
import ReadyUpButton from './ReadyUpButton';
import { roundStates } from '../../reducers/game/roundReducer';
import RevealCardHand from './cards/RevealCardHand';
import useSubscribe from '../../api/useSubscribe';
import usePublish from '../../api/usePublish';
import { playerJoinedGame } from '../../actions/playerActions';
import {
  privateActionsDelegator,
  publicActionsDelegator,
  roundActionDelegator,
} from '../../actions/actionDelegator';
import { selectRoundState, selectYourId } from '../../selectors';
import CardDeck from './cards/CardDeck';
import TemporaryCard from './cards/TemporaryCard';

export default () => {
  const yourId = useSelector(selectYourId);
  const roundState = useSelector(selectRoundState);
  const publishUserName = usePublish({
    destination: '/app/game/flow',
    body: yourId,
  });
  useSubscribe('/topic/game/flow', playerJoinedGame, publishUserName);
  useSubscribe('/topic/round/flow', roundActionDelegator, undefined);
  useSubscribe(`/topic/round/actions/${yourId}`, privateActionsDelegator, undefined);
  useSubscribe('/topic/round/actions', publicActionsDelegator, undefined);

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
            <RevealCardHand playerId={yourId} />
          </div>
        );
      case roundStates.STARTED:
        return (
          <div>
            <h1>Started</h1>
            <CardDeck yourId={yourId} />
            <TemporaryCard />
          </div>
        );
      case roundStates.OVER:
        return <h1>Over</h1>;
      default:
        return <div>Error. Something has gone terribly wrong with Round State</div>;
    }
  };

  return <div>{determineRender()}</div>;
};
