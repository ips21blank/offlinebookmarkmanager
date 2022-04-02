import { ACTIONS, FolCtxMenu } from '@proj-types/types';
import { useAppSelector } from '@redux/hooks';
import { GLOBAL_SETTINGS } from '@scripts/globals';

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

const CtxMenuEl: React.FC<{ title: string; onClick: () => any }> = ({
  title,
  onClick
}) => {
  return (
    <div className="ctx-menu-item" onClick={onClick}>
      {title}
    </div>
  );
};

const CtxMenu: React.FC<{ toggleOverlay: () => any }> = ({ toggleOverlay }) => {
  const [menuType, menuData] = useAppSelector((state) => [
    state.overlay.ctxMenuType,
    state.overlay.ctxMenuData
  ]);

  let content: JSX.Element, n: number;
  if (!menuType || !menuData) {
    return <></>;
  } else if (menuType === ACTIONS.FOL_CONTEXT_MENU) {
    let data = menuData as FolCtxMenu;
    n = 5;
    content = (
      <>
        <CtxMenuEl title="Rename" onClick={menuData.rename} />
        <CtxMenuEl
          title={data.isCollapsed ? 'Expand' : 'Collapse'}
          onClick={data.expandCollapse}
        />
        <CtxMenuEl title="Open links in folder" onClick={() => {}} />
        <CtxMenuEl title="Pin Folder" onClick={() => {}} />
        <CtxMenuEl title="Delete folder" onClick={() => {}} />
      </>
    );
  } else {
    n = 0;
    content = <></>;
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
