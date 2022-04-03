import { OverlayProps, ToggleOverlay } from '@proj-types/types';
import { useAppSelector } from '@redux/hooks';
import { store, toggleOverlay } from '@redux/redux';
import { OVERLAY_CLASSES } from '@scripts/globals';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { OverlayContainer } from './overlay-content';

/**
 * All this (toggleOnEsc, store.dispatch, useEffect, return val of useEffect)
 * just to avoid using show and hide for overlay - it only has a toggle.
 *
 * Now any other function than toggleOnEsc and toggle can't be used to show or
 * hide the overlay once it is shown.
 */
const toggleOnEsc = (e: KeyboardEvent) => {
  console.log('ran once');
  if (e.key === 'Escape') {
    store.dispatch(toggleOverlay());
  }
};
const scrollJammer = (yOffset: number) => () => window.scrollTo(0, yOffset);

const Overlay: React.FC<OverlayProps> = (props) => {
  const [visible, type]: [boolean, OVERLAY_CLASSES] = useAppSelector(
    (state) => [state.overlay.visible, state.overlay.type]
  );
  const dispatch: (action: ToggleOverlay) => any = useDispatch();
  const className = type === OVERLAY_CLASSES.transparent ? 'transparent' : '';

  const toggle = () => dispatch(toggleOverlay());
  const jammer = scrollJammer(window.scrollY);

  useEffect(() => {
    if (visible) {
      window.addEventListener('keydown', toggleOnEsc);
      window.addEventListener('scroll', jammer);
    }
    return () => {
      window.removeEventListener('keydown', toggleOnEsc);
      window.removeEventListener('scroll', jammer);
    };
  });

  return visible ? (
    <div
      id="overlay"
      onClick={toggle}
      className={className}
      onContextMenu={(e) => e.preventDefault()}
    >
      <OverlayContainer toggleOverlay={toggle} />
    </div>
  ) : (
    <></>
  );
};

export { Overlay };
