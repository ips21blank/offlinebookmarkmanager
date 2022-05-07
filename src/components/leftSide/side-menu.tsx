import React, { useEffect } from 'react';
import { DataNode, PinnedFolderProps, SideMenuProps } from '@proj-types/types';
import { PinnedFolder } from './pinned-folder';
import { useAppSelector } from '@redux/hooks';
import { DragEventHandlers } from '@scripts/drag/drag-handlers';
import { BsHouse, BsCalendarDate, FiCopy } from '@components/icons';
import { useDispatch } from 'react-redux';
import { changeCurrLocation } from '@redux/redux';

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
        <span className="inline-el-no-wrap-center">
          <BsCalendarDate /> &nbsp;| Recent
        </span>
        <span className="inline-el-no-wrap-center">
          <FiCopy /> &nbsp;| Duplicates
        </span>
      </div>
      <span id="pin-fol-tip">Drop folders below.</span>
      <div id="pinned-folders">
        {pinProps.map((pinProp) => (
          <PinnedFolder {...pinProp.props} key={pinProp.key} />
        ))}
      </div>
    </nav>
  );
};
