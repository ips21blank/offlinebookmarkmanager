import React, { useEffect } from 'react';
import {
  DataNode,
  FolPageData,
  PinnedFolderProps,
  SideMenuProps
} from '@proj-types/types';
import { PinnedFolder } from './pinned-folder';
import { useAppSelector } from '@redux/hooks';
import { DragEventHandlers } from '@scripts/scripts';
import { BsHouse, BsCalendarDate, FiCopy } from '@components/icons';
import { useDispatch } from 'react-redux';
import {
  changeCurrLocation,
  showDuplicatesPage,
  showRecentPage
} from '@redux/redux';

type P = { props: PinnedFolderProps; key: string };

export const SideMenu: React.FC<SideMenuProps> = (props) => {
  useEffect(() => {
    DragEventHandlers.addEventsToPinnedFolContainer();
  });
  const baseId = useAppSelector((state) => state.bookmarks.db.baseNodeId);
  let [db, currLoc] = useAppSelector((state) => [
    state.bookmarks.db,
    (state.displayState.pageData as FolPageData).currLocation
  ]);
  let [homePin, pinTargets]: [string, string[]] = useAppSelector((state) => [
    state.settings.homePin || '',
    state.settings.pins
  ]);

  const dispatch = useDispatch();

  let pinStrToProp = (pin: string): P => {
    let node = db.get(pin) as DataNode;

    return {
      key: 'pin-key-' + pin,
      props: {
        node: node,
        isHomeLoc: homePin === pin,
        isCurrLoc: currLoc === pin
      }
    };
  };

  let pinProps: P[] = pinTargets.map((pin) => pinStrToProp(pin));

  return (
    <nav id="side-menu">
      <div id="fixed-btn">
        <span
          className="inline-el-no-wrap-center"
          onClick={(e) => dispatch(changeCurrLocation(baseId))}
        >
          <BsHouse /> &nbsp;| Home
        </span>
        <span
          className="inline-el-no-wrap-center"
          onClick={() => dispatch(showRecentPage())}
        >
          <BsCalendarDate /> &nbsp;| Recent
        </span>
        <span
          className="inline-el-no-wrap-center"
          onClick={() => dispatch(showDuplicatesPage())}
        >
          <FiCopy /> &nbsp;| Duplicates
        </span>
      </div>
      <div id="pinned-folders">
        <span id="pin-fol-tip">Drop folders below.</span>
        {pinProps.map((pinProp) => (
          <PinnedFolder {...pinProp.props} key={pinProp.key} />
        ))}
      </div>
    </nav>
  );
};
