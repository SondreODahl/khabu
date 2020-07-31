import { useSelector } from 'react-redux';
import React, { useCallback } from 'react';
import { selectCardHand } from '../../../selectors';
import RevealCard from './CardWrapper';
import './CardHand.css';
import { getCardAction } from '../../../selectors/gameStateSelectors';
import {
  PUT_MOVE,
  REVEAL_MOVE,
  SWAP_MOVE,
  TRANSFER_MOVE,
} from '../../../constants/gameMoves';
import CardWrapper from './CardWrapper';

export default (props) => {
  const cards = useSelector((state) => selectCardHand(state, props));
  const renderCards = () => {
    return cards.map((id) => {
      return <CardWrapper playerId={props.playerId} id={id} key={id} />;
    });
  };
  return <div className={'ui five column grid'}>{renderCards()}</div>;
};
