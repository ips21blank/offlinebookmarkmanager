import { toggleOverlay } from '@redux/redux';
import { store } from '@redux/redux';

const testFn = () => {
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
  //   store.dispatch(toggleOverlay());
  // });
};

export { testFn };
