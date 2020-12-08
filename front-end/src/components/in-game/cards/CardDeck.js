import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getCanYouDrawCard } from '../../../selectors';
import RedCardBack from '../../../assets/images/purple_back.png';
import usePublishMove from './usePublishMove';

export default (props) => {
  const playerCanDraw = useSelector(getCanYouDrawCard);
  const publishDraw = usePublishMove('DRAW_FROM_DECK', {
    currentPlayerId: props.yourId,
  });
  const drawCard = useCallback(() => {
    if (playerCanDraw) {
      publishDraw();
    } else {
      console.log('Cannot draw card');
    }
  }, [playerCanDraw]);

  return (
    <div>
      <img
        src={RedCardBack}
        alt={'Drawing Deck'}
        style={{ width: '120px', height: '200px' }}
        onClick={drawCard}
      />
    </div>
  );
};
