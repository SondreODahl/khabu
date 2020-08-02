import React from 'react';
import { useSelector } from 'react-redux';
import ReadyUpButton from '../buttons/ReadyUpButton';
import { roundStates } from '../../../reducers/game/roundReducer';
import CardHand from '../cards/CardHand/CardHand';
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
import CardDeck from '../cards/CardDeck';
import TemporaryCard from '../cards/TemporaryCard';
import DiscardPile from '../cards/DiscardPile';
import NameDisplay from '../NameDisplay';
import EndTurnButton from '../buttons/EndTurnButton';
import GameInterface from './GameInterface';
import WaitingPage from './WaitingPage';

export default () => {
  const yourId = useSelector(selectYourId);
  const opponentId = useSelector(selectOpponentId);
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
        return <WaitingPage />;
      case roundStates.NOT_STARTED:
        return (
          <div>
            <ReadyUpButton yourId={yourId} />
          </div>
        );
      case roundStates.INITIALIZING:
      case roundStates.STARTED:
        return <GameInterface yourId={yourId} opponentId={opponentId} />;
      case roundStates.OVER:
        return <h1>Over</h1>;
      default:
        return <div>Error. Something has gone terribly wrong with Round State</div>;
    }
  };

  return <div>{determineRender()}</div>;
};