import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getCanYouDrawCard } from '../../../selectors';
import RedCardBack from '../../../assets/images/purple_back.png';
import usePublishMove from './usePublishMove';
import CardDisplay from './Card/CardDisplay';

// The drawing deck in the middle.
const CardDeck = (props) => {
  const playerCanDraw = useSelector(getCanYouDrawCard);
  const publishDraw = usePublishMove('DRAW_FROM_DECK', {
    currentPlayerId: props.yourId,
  });
  const drawCard = useCallback(() => {
    if (playerCanDraw) {
      publishDraw();
    }
  }, [playerCanDraw]);

  return (
    <CardDisplay
      image={RedCardBack}
      name={'card-deck'}
      value={'Card Deck'}
      onClick={drawCard}
    />
  );
};

export default CardDeck;
