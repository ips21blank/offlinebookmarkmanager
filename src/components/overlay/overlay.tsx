import { OverlayProps, ToggleOverlay } from '@proj-types/types';
import { useAppSelector } from '@redux/hooks';
// import { toggleOverlay } from '@redux/redux';
import { Utilities } from '@scripts/utilities';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Overlay: React.FC<OverlayProps> = (props) => {
  const [visible, toggleOverlay] = useState(false);
  // const renderOverlay: boolean = useAppSelector(
  //   (state) => state.overlay.visible
  // );
  // const dispatch: (action: ToggleOverlay) => any = useDispatch();
  // const toggle = () => dispatch(toggleOverlay());

  return visible ? (
    <div id="overlay" onClick={() => toggleOverlay(!visible)}>
      <div id="overlay-container" onClick={(e) => e.stopPropagation()}>
        {Utilities.dummyContent(20)}
      </div>
    </div>
  ) : (
    <></>
  );
};

export { Overlay };
