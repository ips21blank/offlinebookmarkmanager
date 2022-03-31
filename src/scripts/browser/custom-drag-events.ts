import { GLOBAL_SETTINGS } from '../globals';

type U = null | number;
type V = 'up' | 'down';

let DRAGGING: boolean = false;
let dragEl: HTMLElement;

const DRAG_LOC: { x: U; y: U; mouse: V; el?: HTMLElement } = {
  x: null,
  y: null,
  mouse: 'up'
};

const customDrag = new Event('customdrag');
const customDrop = new Event('customdrop');
const customEnd = new Event('customend');

const customDragIFFY = () => {
  const checkDragging = (e: MouseEvent) => {
    if (
      Math.abs(e.pageX - (DRAG_LOC.x as number)) +
        Math.abs(e.pageY - (DRAG_LOC.y as number)) >
      GLOBAL_SETTINGS.dragStartThreshold
    ) {
      DRAGGING = true;
      window.removeEventListener('mousemove', checkDragging);
      dragEl.dispatchEvent(customDrag);
    }
  };

  window.addEventListener('mousedown', (e) => {
    e.preventDefault();
    let el = e.target as HTMLElement,
      condn =
        el &&
        (el.classList.contains('bookmark') ||
          (el.parentElement && el.parentElement.classList.contains('folder')));

    if (condn) {
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
        e.target.dispatchEvent(customDrop);
      } else {
        document.body.dispatchEvent(customDrop);
      }
    }

    // This is fired after the customdrop event.
    window.dispatchEvent(customEnd);
  });
};

const getDragEl = () => dragEl;
const isDragging = () => DRAGGING;

export { customDragIFFY, getDragEl, isDragging };
