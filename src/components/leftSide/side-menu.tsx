import React, { useEffect } from 'react';
import { DataNode, PinnedFolderProps, SideMenuProps } from '@proj-types/types';
import { PinnedFolder } from './pinned-folder';
import { useAppSelector } from '@redux/hooks';
import { DragEventHandlers } from '@scripts/drag/drag-handlers';
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
  const dispatch = useDispatch();
  let db = useAppSelector((state) => state.bookmarks.db);
  let homePin: string = useAppSelector((state) => state.settings.homePin || '');

  let pinTargets: string[] = useAppSelector((state) => state.settings.pins);

  let pinStrToProp = (pin: string): P => {
    let node = db.get(pin) as DataNode;

    return {
      key: 'pin-key-' + pin,
      props: {
        node: node,
        isHomeLoc: homePin === pin
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
