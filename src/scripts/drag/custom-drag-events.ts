import {
  GLOBAL_SETTINGS,
  CUSTOM_EVENTS,
  FOLDER_CLASSES,
  BKM_CLASSES
} from '../globals';

type U = null | number;
type V = 'up' | 'down';

let DRAGGING: boolean = false;
let DRAG_EL: HTMLElement;

const checkIfElIsDragElement = (el: HTMLElement): boolean => {
  return (
    (el.parentElement &&
      el.parentElement.classList.contains(FOLDER_CLASSES.FOL)) ||
    el.classList.contains(BKM_CLASSES.BKM) ||
    el.classList.contains(FOLDER_CLASSES.PIN_TITLE)
  );
};

const DRAG_LOC: { x: U; y: U; mouse: V; el?: HTMLElement } = {
  x: null,
  y: null,
  mouse: 'up'
};

const addCustomDragEvents = () => {
  const eatClick = (e: MouseEvent) => {
    e.preventDefault();
    window.removeEventListener('click', eatClick);
  };
  const checkDragging = (e: MouseEvent) => {
    if (
      Math.abs(e.pageX - (DRAG_LOC.x as number)) +
        Math.abs(e.pageY - (DRAG_LOC.y as number)) >
      GLOBAL_SETTINGS.dragStartThreshold
    ) {
      DRAGGING = true;
      window.removeEventListener('mousemove', checkDragging);
      window.addEventListener('click', eatClick);
      DRAG_EL.dispatchEvent(CUSTOM_EVENTS.customDrag);
    }
  };

  window.addEventListener('mousedown', (e: MouseEvent) => {
    // e.preventDefault(); // MOVED DOWN: This focusing/blurring as well.
    let isNotFocused = document.activeElement !== e.target;

    document.activeElement instanceof HTMLElement &&
      isNotFocused &&
      document.activeElement.blur();

    let el = e.target;
    if (!el || !(el instanceof HTMLElement)) return;
    isNotFocused && el.focus();

    if (checkIfElIsDragElement(el)) e.preventDefault();

    let condn0 =
      el.classList.contains(FOLDER_CLASSES.FUL_TITLE) ||
      (el.parentElement &&
        el.parentElement.classList.contains(FOLDER_CLASSES.FUL_TITLE));
    let condn =
      (el &&
        (el.classList.contains(BKM_CLASSES.BKM) ||
          (el.parentElement &&
            el.parentElement.classList.contains(FOLDER_CLASSES.FOL)) ||
          el.classList.contains(FOLDER_CLASSES.PIN_TITLE))) ||
      condn0;

    if (condn && !e.button) {
      // e.button === 0 for left click.
      DRAG_EL = condn0 ? (el.parentElement as HTMLElement) : el;
      DRAG_LOC.x = e.pageX;
      DRAG_LOC.y = e.pageY;
      DRAG_LOC.mouse = 'down';
      window.addEventListener('mousemove', checkDragging);
    }
  });

  window.addEventListener('mouseup', (e) => {
    window.removeEventListener('mousemove', checkDragging);

    if (DRAGGING) {
      e.preventDefault();
      DRAGGING = false;
      DRAG_LOC.x = DRAG_LOC.y = null;
      DRAG_LOC.mouse = 'up';

      if (e.target) {
        e.target.dispatchEvent(CUSTOM_EVENTS.customDrop);
      } else {
        document.body.dispatchEvent(CUSTOM_EVENTS.customDrop);
      }
      /**
       * This is fired after the customdrop event. Check the
       * corresponding event in DragMgr.onDragEnd method
       */
      window.dispatchEvent(CUSTOM_EVENTS.customEnd);
    }
  });
};

const getDragEl = () => DRAG_EL;
const isDragging = () => DRAGGING;

export { addCustomDragEvents, getDragEl, isDragging };
