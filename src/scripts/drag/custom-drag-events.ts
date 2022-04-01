import { GLOBAL_SETTINGS, CUSTOM_EVENTS } from '../globals';

type U = null | number;
type V = 'up' | 'down';

let DRAGGING: boolean = false;
let dragEl: HTMLElement;

const DRAG_LOC: { x: U; y: U; mouse: V; el?: HTMLElement } = {
  x: null,
  y: null,
  mouse: 'up'
};

const customDragIFFY = () => {
  const checkDragging = (e: MouseEvent) => {
    if (
      Math.abs(e.pageX - (DRAG_LOC.x as number)) +
        Math.abs(e.pageY - (DRAG_LOC.y as number)) >
      GLOBAL_SETTINGS.dragStartThreshold
    ) {
      DRAGGING = true;
      window.removeEventListener('mousemove', checkDragging);
      dragEl.dispatchEvent(CUSTOM_EVENTS.customDrag);
    }
  };

  window.addEventListener('mousedown', (e) => {
    e.preventDefault();
    let el = e.target as HTMLElement,
      condn =
        el &&
        (el.classList.contains('bookmark') ||
          (el.parentElement && el.parentElement.classList.contains('folder')));

    if (condn && !e.button) {
      dragEl = el;
      DRAG_LOC.x = e.pageX;
      DRAG_LOC.y = e.pageY;
      DRAG_LOC.mouse = 'down';
      window.addEventListener('mousemove', checkDragging);
    }
  });

  window.addEventListener('mouseup', (e) => {
    window.removeEventListener('mousemove', checkDragging);

    if (DRAGGING) {
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

const getDragEl = () => dragEl;
const isDragging = () => DRAGGING;

export { customDragIFFY, getDragEl, isDragging };
