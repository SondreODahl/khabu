import { useDispatch, useSelector } from 'react-redux';
import { selectCardHand } from '../../selectors';
import React, { useEffect } from 'react';
import { retrievePlayers } from '../../actions/playerActions';
import { initializeRound, startRound } from '../../actions';
import { revealCard } from '../../actions/cardActions';
import RevealCardHand from '../in-game/cards/CardHand/CardHand';
import useSubscribe from '../../api/useSubscribe';
import {
  privateActionsDelegator,
  publicActionsDelegator,
} from '../../actions/actionDelegator';
import TestDiscardPile from './TestDiscardPile';
import NameDisplay from '../in-game/NameDisplay';

export default () => {
  const cardHand = useSelector((state) => selectCardHand(state, { playerId: 0 }));
  useSubscribe(`/topic/round/actions/${0}`, privateActionsDelegator, undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      retrievePlayers({
        yourId: '0',
        playerIds: { 0: 'Humlesnurr' },
      })
    );
    dispatch(initializeRound(1, 4));
    dispatch(revealCard(0, 2, 3));
    dispatch(startRound(0));
    dispatch(
      publicActionsDelegator(
        null,
        JSON.stringify({
          type: 'PUT',
          agent: 0,
          victim: 0,
          victimCard: 1,
          status: 'success',
          value: 2,
        })
      )
    );
  }, []);

  const render = () => {
    if (cardHand) {
      return (
        <div>
          <RevealCardHand playerId={0} />
          <TestDiscardPile dispatch={dispatch} />
          <NameDisplay playerId={0} />
        </div>
      );
    }
  };

  return <div>{render()}</div>;
};
