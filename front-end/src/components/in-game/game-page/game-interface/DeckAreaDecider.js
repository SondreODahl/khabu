import React from 'react';
import SwapModal from './SwapModal';
import DeckArea from './DeckArea';
import { useSelector } from 'react-redux';
import { shouldModalRender } from '../../../../selectors';
import ReadyUpButton from '../buttons/ReadyUpButton';

// Determines whether the SwapModal or the DeckArea should render
const DeckAreaDecider = (props) => {
  const shouldRenderModal = useSelector(shouldModalRender);
  if (shouldRenderModal) return <SwapModal />;
  if (props.roundOver) return <ReadyUpButton />
  return <DeckArea readyUp={props.readyUp} />;
};

export default DeckAreaDecider;
