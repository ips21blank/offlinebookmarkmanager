import { OverlayContentProps } from '@proj-types/types';
import { Utilities } from '@scripts/utilities';

const OverlayContainer: React.FC<OverlayContentProps> = ({ toggleOverlay }) => {
  return (
    <div id="overlay-content" onClick={(e) => e.stopPropagation()}>
      {Utilities.dummyContent(20)}
    </div>
  );
};

export { OverlayContainer };
