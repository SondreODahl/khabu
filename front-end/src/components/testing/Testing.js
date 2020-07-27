import React, { useEffect, useMemo } from 'react';
import GreetButton from './GreetButton';
import ReadyUpButton from '../in-game/ReadyUpButton';
import { useRESTGet } from '../../api/RESTServer';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeRound, startRound } from '../../actions';
import { retrievePlayers } from '../../actions/playerActions';
import { createSelector } from 'reselect';
import { getCardIndexForCard, selectCard, selectCardHand } from '../../selectors';
import { revealCard } from '../../actions/cardActions';
import HandIndexSelector from './HandIndexSelector';

export default (props) => {
  const url = '/api/hello';
  const { getRESTData } = useRESTGet();
  const data = useSelector((state) => state.api.get_data);
  const dispatch = useDispatch();
  const IdInCardHand = useSelector((state) => selectCard(state, { id: 0 }));
  console.log(IdInCardHand);
  const cardHand = useSelector((state) => selectCardHand(state, { playerId: 0 }));
  console.log(cardHand);

  useEffect(() => {
    getRESTData(url);
  }, [getRESTData]);

  useEffect(() => {
    dispatch(
      retrievePlayers({
        yourId: '0',
        playerIds: { '0': 'Humlesnurr' },
      })
    );
    dispatch(initializeRound(1, 4));
    dispatch(startRound(0));
    dispatch(revealCard(0, 1337));
  }, []);

  const render = () => {
    if (cardHand) {
      return <HandIndexSelector />;
    }
  };

  return (
    <div>
      <Link to={'/'}>
        <button className={'ui blue button'}>Home</button>
      </Link>
      <div className={'ui hidden divider'} />
      <div className={'ui two column relaxed grid'}>
        <div className={'column'}>
          <GreetButton />
          {data}
          {render()}
        </div>
        <div className={'column'}>
          <ReadyUpButton />
        </div>
      </div>
    </div>
  );
};
