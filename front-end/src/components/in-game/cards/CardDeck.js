import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getCanYouDrawCard } from '../../../selectors';
import RedCardBack from '../../../assets/images/purple_back.png';
import usePublishMove from './usePublishMove';

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
    <div className={'card-deck'}>
      {/* TODO: Make images not pixels */}
      <img
        src={RedCardBack}
        alt={'Drawing Deck'}
        style={{ width: '120px', height: '200px' }} 
        onClick={drawCard}
      />
    </div>
  );
};

export default CardDeck;
