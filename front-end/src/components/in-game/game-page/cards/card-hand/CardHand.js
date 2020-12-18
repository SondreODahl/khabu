import { useSelector } from 'react-redux';
import React from 'react';
import { selectCardHand, selectYourId } from '../../../../../selectors';
import './CardHand.css';
import CardWrapper from '../card/CardWrapper';

// The cardhand for both the player and the opponent.
const CardHand = (props) => {
  const cards = useSelector((state) => selectCardHand(state, props));
  const yourId = useSelector(selectYourId);
  const yourHand = props.playerId === yourId;
  const className = yourHand ? 'your-hand' : 'opponent-hand';
  const mapFunction = (id) => {
    if (id === null) return <div className={'empty-card'}>{null}</div>;
    return (
      <CardWrapper
        playerId={props.playerId}
        yourId={yourId}
        id={id}
        key={id}
      />
    );
  };
  const renderCards = () => {
    if (yourHand) return cards.map(mapFunction);
    return cards.reverse().map(mapFunction); // Cards should be in reverse order for the other player
  };
  return <div className={`card-hand ${className}`}>{renderCards()}</div>;
};

export default CardHand;
