import {
  ACTIONS,
  AddIcon,
  BkmCtxMenu,
  FolCtxMenu,
  PAGE_TYPE,
  PinCtxMenu,
  PinFolder,
  SetPinAsHome,
  ShowPopup,
  UpdateCurrLocation
} from '@proj-types/types';
import {
  useAppSelector,
  pinFolder,
  // showPopup,
  showEditNodePopup,
  showCopyToPopup,
  showMovePopup,
  changeCurrLocation,
  setPinAsHome,
  addIcon,
  showConfirmPopup
} from '@redux/redux';
import { browserAPI } from '@scripts/scripts';
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
  const [menuType, menuData, pageType, rootId, isIcon] = useAppSelector(
    (state) => [
      state.overlay.ctxMenuType,
      state.overlay.ctxMenuData,
      state.displayState.pageType,
      state.bookmarks.db.baseNodeId,
      !!state.overlay.ctxMenuData &&
        state.bookmarks.db.isIcon(state.overlay.ctxMenuData.node.id)
    ]
  );
  const dispatch: (
    action: PinFolder | ShowPopup | UpdateCurrLocation | SetPinAsHome | AddIcon
  ) => any = useDispatch();
  const isNotFolPage = pageType !== PAGE_TYPE.FOL;

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
        {isNotFolPage ? (
          <CtxMenuEl
            title="Show In Folder"
            onClickAction={() => {
              dispatch(changeCurrLocation(rootId, menuData.node.id));
            }}
            highlight
          />
        ) : (
          <></>
        )}
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
          onClickAction={(e) => {
            e.stopPropagation();
            dispatch(
              showConfirmPopup({
                title: 'Warning',
                text:
                  'Are you sure you want to delete entire folder?' +
                  ' This app CANNOT UNDO.',
                action: function () {
                  browserAPI.removeTr(menuData.node.id);
                }
              })
            );
          }}
          highlight
        />
      </>
    );
  } else if (menuType === ACTIONS.PIN_CONTEXT_MENU) {
    n = 1;
    let data = menuData as PinCtxMenu;
    content = (
      <CtxMenuEl
        title="Set as Home"
        onClickAction={() => {
          dispatch(setPinAsHome(data.node.id));
        }}
      />
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
        {isIcon ? (
          <CtxMenuEl
            title="Show full name in Top Bar"
            onClickAction={(e: React.MouseEvent) => {
              browserAPI.update(data.node.id, { title: data.node.title });
            }}
            highlight
          />
        ) : (
          <CtxMenuEl
            title="Show Icon Only in Top Bar"
            onClickAction={(e: React.MouseEvent) => {
              // browserAPI.update(menuData.node.id, { title: '' });
              // throw 'Storage API is required for storing bookmark names.';

              dispatch(addIcon(data.node.id));
              browserAPI.update(data.node.id, { title: '' });
            }}
            highlight
          />
        )}
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
        {isNotFolPage ? (
          <CtxMenuEl
            title="Show In Folder"
            onClickAction={() => {
              dispatch(changeCurrLocation(rootId, menuData.node.id));
            }}
            highlight
          />
        ) : (
          <></>
        )}
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
