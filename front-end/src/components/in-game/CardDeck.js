import React, { useCallback, useEffect } from 'react';
import usePublish from '../../api/usePublish';
import { useSelector } from 'react-redux';
import { getCanDrawCard } from '../../selectors/gameStateSelectors';
import RedCardBack from '../../assets/images/purple_back.png';

export default (props) => {
  const playerCanDraw = useSelector(getCanDrawCard);

  const json = {
    action: 'DRAW_FROM_DECK',
    currentPlayerId: props.yourId,
  };
  const publishDraw = usePublish({
    destination: '/app/round/actions',
    body: JSON.stringify(json),
  });
  const drawCard = useCallback(() => {
    if (playerCanDraw) {
      publishDraw();
    } else {
      console.log('Cannot draw card');
    }
  }, []);

  return (
    <div>
      <h1>Deck</h1>
      <img
        src={RedCardBack}
        alt={'Drawing Deck'}
        style={{ width: '120px', height: '200px' }}
        onClick={drawCard}
      />
    </div>
  );
};
