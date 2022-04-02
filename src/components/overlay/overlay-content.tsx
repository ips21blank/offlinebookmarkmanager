import { OverlayContentProps } from '@proj-types/types';
import { useAppSelector } from '@redux/hooks';
import { OVERLAY_STATES } from '@scripts/globals';
import { Utilities } from '@scripts/utilities';
import { CtxMenu } from './context-menu';

const OverlayContainer: React.FC<OverlayContentProps> = ({ toggleOverlay }) => {
  const state = useAppSelector((state) => state.overlay.state);

  return (
    <div id="overlay-content" onClick={(e) => e.stopPropagation()}>
      {state === OVERLAY_STATES.ctxMenu ? (
        <CtxMenu toggleOverlay={toggleOverlay} />
      ) : (
        Utilities.dummyContent(20)
      )}
    </div>
  );
};

export { OverlayContainer };
