import {
  ACTIONS,
  BkmCtxMenu,
  FolCtxMenu,
  PinFolder,
  ShowPopup
} from '@proj-types/types';
import {
  useAppSelector,
  pinFolder,
  showPopup,
  showEditNodePopup,
  showCopyToPopup,
  showMovePopup
} from '@redux/redux';
import { browserAPI } from '@scripts/browser/browser-api';
import { GLOBAL_SETTINGS } from '@scripts/globals';
import { useDispatch } from 'react-redux';

const ctxMenuPosn = (x: number, y: number, n: number) => {
  if (!n) return '';
  /**
   * Ctx menu width is set using css. But aprox. tolerances
   * have been defined in GLOBAL_SETTINGS.
   * Also, height of one ctx menu item is taken as 2 rem.
   */
  let rem = GLOBAL_SETTINGS.rem,
    h0 = window.innerHeight,
    w0 = window.innerWidth;
  let moveLeft = GLOBAL_SETTINGS.ctxMenuRightTolerance * rem > w0 - x,
    moveUp =
      GLOBAL_SETTINGS.ctxMenuBottomTolenance * rem > h0 - (n * 2 * rem + y);

  return `${moveLeft ? 'shift-left' : ''} ${moveUp ? 'shift-up' : ''}`.trim();
};

const CtxMenuEl: React.FC<{
  title: string;
  onClickAction: (e: React.MouseEvent) => any | void;
  highlight?: boolean;
}> = ({ title, onClickAction, highlight }) => {
  return (
    <div
      className={`ctx-menu-item${highlight ? ' highlight' : ''}`}
      onClick={onClickAction}
    >
      {title}
    </div>
  );
};

const CtxMenu: React.FC<{ toggleOverlay: () => any }> = ({ toggleOverlay }) => {
  const [menuType, menuData] = useAppSelector((state) => [
    state.overlay.ctxMenuType,
    state.overlay.ctxMenuData
  ]);
  const dispatch: (action: PinFolder | ShowPopup) => any = useDispatch();

  let content: JSX.Element, n: number;
  if (!menuType || !menuData) {
    return <></>;
  } else if (menuType === ACTIONS.FOL_CONTEXT_MENU) {
    let data = menuData as FolCtxMenu;
    n = 5;
    content = (
      <>
        <CtxMenuEl title="Rename" onClickAction={menuData.rename} />
        <CtxMenuEl
          title={data.isCollapsed ? 'Expand' : 'Collapse'}
          onClickAction={data.expandCollapse}
        />
        <CtxMenuEl
          title="Open links in folder"
          onClickAction={() => {
            if (menuData.node.children)
              for (let ch of menuData.node.children) {
                ch.url && window.open(ch.url);
              }
          }}
        />
        <CtxMenuEl
          title="Pin Folder"
          onClickAction={() => {
            dispatch(pinFolder(menuData.node, 0));
          }}
        />
        <CtxMenuEl
          title="Move this Folder"
          onClickAction={(e: React.MouseEvent) => {
            e.stopPropagation();
            dispatch(
              showMovePopup({
                title: 'Move to Folder',
                idList: [menuData.node.id]
              })
            );
          }}
        />
        <CtxMenuEl
          title="Delete folder"
          onClickAction={() => {
            browserAPI.removeBk(menuData.node.id);
          }}
          highlight
        />
      </>
    );
  } else {
    n = 5;
    let data = menuData as BkmCtxMenu;
    content = (
      <>
        <CtxMenuEl
          title="Open in new tab"
          onClickAction={() => {
            window.open(data.node.url);
          }}
        />
        <CtxMenuEl title="Rename" onClickAction={menuData.rename} />
        <CtxMenuEl
          title="Show Icon Only"
          onClickAction={(e: React.MouseEvent) => {
            browserAPI.update(menuData.node.id, { title: '' });
            throw 'Storage API is required for storing bookmark names.';
          }}
        />
        <CtxMenuEl
          title="Edit"
          onClickAction={(e: React.MouseEvent) => {
            e.stopPropagation();
            dispatch(
              showEditNodePopup({ node: data.node, title: 'Edit' })
              // TESTING.
              // showPopup(ACTIONS.INFO, { title: 'Edit', text: 'Info popup' })
              // showPopup(ACTIONS.CONFIRM, {
              //   title: 'Warning',
              //   text: 'Are you sure?',
              //   action: () => {}
              // })
              // showPopup(ACTIONS.MOVE_POPUP, {
              //   title: 'Move to Folder',
              //   idList: [menuData.node.id]
              // })
              // showPopup(ACTIONS.COPY_TO_POPUP, {
              //   title: 'Copy to Folder',
              //   idList: [menuData.node.id]
              // })
            );
          }}
        />
        <CtxMenuEl
          title="Move to Folder"
          onClickAction={(e: React.MouseEvent) => {
            e.stopPropagation();
            dispatch(
              showMovePopup({
                title: 'Move to Folder',
                idList: [menuData.node.id]
              })
            );
          }}
        />
        <CtxMenuEl
          title="Copy to Folder"
          onClickAction={(e: React.MouseEvent) => {
            e.stopPropagation();
            dispatch(
              showCopyToPopup({
                title: 'Copy to Folder',
                idList: [menuData.node.id]
              })
            );
          }}
        />
        <CtxMenuEl
          title="Delete bookmark"
          onClickAction={() => {
            browserAPI.removeBk(menuData.node.id);
          }}
          highlight
        />
      </>
    );
  }

  return (
    <div
      id="context-menu"
      className={ctxMenuPosn(menuData.x, menuData.y, n)}
      onClick={toggleOverlay}
      style={{ top: menuData.y, left: menuData.x }}
    >
      {content}
    </div>
  );
};

export { CtxMenu };
