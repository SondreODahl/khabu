import SwapModal from '../SwapModal';
import { DeckArea } from './DeckArea';

// Determines whether the SwapModal or the DeckArea should render
const DeckAreaDecider = (props) => {
  const shouldRenderModal = useSelector(shouldModalRender);
  if (shouldRenderModal) return <SwapModal />;
  return <DeckArea readyUp={props.readyUp} />;
};

export default DeckAreaDecider;
