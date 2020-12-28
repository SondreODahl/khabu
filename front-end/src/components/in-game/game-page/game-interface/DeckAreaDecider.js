import React from 'react';
import SwapModal from './SwapModal';
import DeckArea from './DeckArea';
import { useSelector } from 'react-redux';
import { shouldModalRender } from '../../../../selectors';

// Determines whether the SwapModal or the DeckArea should render
const DeckAreaDecider = (props) => {
  const shouldRenderModal = useSelector(shouldModalRender);
  if (shouldRenderModal) return <SwapModal />;
  return <DeckArea readyUp={props.readyUp} />;
};

export default DeckAreaDecider;
