import {
  CopyToPopupProps,
  HighlightElementsMoved,
  MovePopupProps
} from '@proj-types/types';
import React, { useState } from 'react';
import { GenericPopup } from './generic/generic-popup';
import { browserAPI } from '@scripts/browser/browser-api';
import { SelectFolderComp } from './folder-selector';
import { useAppSelector } from '@redux/hooks';
import { highlightElementsMoved } from '@redux/redux';
import { useDispatch } from 'react-redux';

const CopyMovePopup: React.FC<MovePopupProps | CopyToPopupProps> = (props) => {
  const [nodes, db] = useAppSelector((state) => [
    state.bookmarks.db.baseNode.children,
    state.bookmarks.db
  ]);
  const [selectedId, selectId] = useState('');
  const dispatch: (action: HighlightElementsMoved) => any | void =
    useDispatch();

  let actions = [
      {
        title: props.copyOrMove === 'move' ? 'Move' : 'Copy',
        action: () => {
          props.toggleOverlay();

          if (props.copyOrMove === 'move') {
            for (let id of props.idList) {
              browserAPI.moveBk(id, { parentId: selectedId });
            }
          } else {
            for (let id of props.idList) {
              let node = db.get(id);
              if (node)
                browserAPI.createBk({
                  parentId: selectedId,
                  url: node.url,
                  title: node.title
                });
            }
          }

          dispatch(highlightElementsMoved(props.idList));
        }
      },
      { title: 'Cancel', action: props.toggleOverlay }
    ],
    className = '',
    movePopupProps = { ...props, actions, className };

  return (
    <GenericPopup {...movePopupProps}>
      {nodes && nodes.length ? (
        <SelectFolderComp {...{ nodes, selectFol: selectId, selectedId }} />
      ) : (
        <></>
      )}
    </GenericPopup>
  );
};

export { CopyMovePopup };
