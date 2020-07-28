import React, { useEffect } from 'react';
import DiscardPile from '../in-game/DiscardPile';
import { drawFromDeckAndRegisterCard } from '../../actions/cardActions';

export default (props) => {
  useEffect(() => {
    props.dispatch(drawFromDeckAndRegisterCard(3));
  }, []);
  return <DiscardPile />;
};
