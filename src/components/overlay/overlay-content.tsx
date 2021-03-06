import { OverlayContentProps } from '@proj-types/types';
import { useAppSelector } from '@redux/hooks';
import { OVERLAY_STATES } from '@scripts/globals';
import { CtxMenu } from './context-menu';
import { Popup } from './popup';

const OverlayContainer: React.FC<OverlayContentProps> = ({ toggleOverlay }) => {
  const [overlayState, fullHeight] = useAppSelector((state) => [
    state.overlay.overlayState,
    state.overlay.fullHeight
  ]);

  return (
    <div
      id="overlay-content"
      className={fullHeight ? 'full-height' : ''}
      onClick={(e) => e.stopPropagation()}
    >
      {overlayState === OVERLAY_STATES.ctxMenu ? (
        <CtxMenu toggleOverlay={toggleOverlay} />
      ) : (
        <Popup toggleOverlay={toggleOverlay} />
      )}
    </div>
  );
};

export { OverlayContainer };
