import { toggleOverlay } from '@redux/redux';
import { getStore } from '@redux/redux';
import { ChangeEvent } from 'react';

const PICKER_ID = 'my-color-picker-someval-asefawvd';
const defaultColor = '#bd57cd';
const COL_TYPE = {
  BG_COL: 'backgroundColor',
  COLOUR: 'color'
};

function showPicker(
  shift: boolean,
  val: string,
  setCol: (val: string, finished?: boolean) => void
) {
  const $make = (elType: string, attrib: any, children: HTMLElement[]) => {
    let el = document.createElement(elType);

    if (attrib) {
      for (let att in attrib) {
        if (att === 'style') {
          let styles = attrib[att] as { [key: string]: any };
          for (let style in styles) {
            (el.style as any)[style] = styles[style];
          }
        } else {
          el.setAttribute(att, attrib[att]);
        }
      }
    }

    if (children && children.length) {
      for (let ch of children) {
        el.appendChild(ch);
      }
    }
    return el;
  };

  const picker = $make(
    'input',
    {
      id: PICKER_ID,
      type: 'color',
      value: val || defaultColor,
      style: {
        height: '4rem',
        width: '4rem',
        position: 'fixed',
        top: shift ? '60rem' : '25rem',
        left: shift ? '60rem' : '25rem',
        display: 'block',
        zIndex: 999999
      }
    },
    []
  );
  picker.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  (picker as HTMLInputElement).addEventListener('change', (e) => {
    if (e.target) setCol((e.target as any).value);
  });

  const removePicker = (e: MouseEvent) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    console.log('removing picker');

    setCol((picker as HTMLInputElement).value, true);
    document.body.removeChild(picker);
    window.removeEventListener('click', removePicker);
  };

  document.body.appendChild(picker);
  window.addEventListener('click', removePicker);
}

const testFn = () => {
  // return;
  // window.addEventListener('click', (e) => {
  //   let l = console.log;
  //   l(e.target);
  //   l(`clnt : (${e.clientX}, ${e.clientY})`);
  //   l(`ofst : (${e.offsetX}, ${e.offsetY})`);
  //   l(`page : (${e.pageX}, ${e.pageY})`);
  //   l(`scrn : (${e.screenX}, ${e.screenY})`);
  //   l('...............................................');
  // });
  //
  //
  // window.addEventListener('contextmenu', (e) => {
  //   e.preventDefault();
  //   getStore().dispatch(toggleOverlay());
  // });
  //
  //
  // ......................................................
  // console.log('THEME SETTER');
  // ......................................................
  //
  // let hoverEl: HTMLElement,
  //   colType = COL_TYPE.BG_COL,
  //   FLAG_CLASS = 'FLAG_CLASS',
  //   lastColor: string,
  //   pickingColor = false;
  // const setCol = (col: string, finished?: boolean) => {
  //   lastColor = col;
  //   hoverEl.style[colType as any] = col;
  //   // console.log(hoverEl, col, colType, hoverEl.style[colType]);
  //   finished && (pickingColor = false);
  // };
  // let clickHandler = (e: MouseEvent) => {
  //   if (pickingColor || e.ctrlKey) return;
  //   colType = e.altKey ? COL_TYPE.COLOUR : COL_TYPE.BG_COL;
  //   e.preventDefault();
  //   e.stopPropagation();
  //   showPicker(false, lastColor, setCol);
  //   pickingColor = true;
  // };
  // window.addEventListener('mouseover', (e) => {
  //   if (pickingColor) return;
  //   let elList = document.getElementsByClassName(FLAG_CLASS);
  //   while (elList.length) {
  //     (elList[0] as HTMLElement).style.outline = '';
  //     elList[0].classList.remove(FLAG_CLASS);
  //   }
  //   hoverEl = e.target as HTMLElement;
  //   if (e.shiftKey) {
  //     hoverEl = hoverEl.parentElement as HTMLElement;
  //   }
  //   hoverEl.style.outline = '2px solid rgb(0,255,0)';
  //   hoverEl.classList.add(FLAG_CLASS);
  //   hoverEl.addEventListener('click', clickHandler);
  //   // console.log(hoverEl);
  // });
};

export { testFn };
