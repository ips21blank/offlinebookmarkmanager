import {
  CopyToPopupProps,
  HighlightElementsMoved,
  MovePopupProps,
  ShowPopup
} from '@proj-types/types';
import React, { useState } from 'react';
import { GenericPopup } from './generic/generic-popup';
import { browserAPI } from '@scripts/scripts';
import { SelectFolderComp } from './folder-selector';
import { useAppSelector } from '@redux/hooks';
import { highlightElementsMoved, showInfoPopup } from '@redux/redux';
import { useDispatch } from 'react-redux';

const CopyMovePopup: React.FC<MovePopupProps | CopyToPopupProps> = (props) => {
  const [nodes, db] = useAppSelector((state) => [
    state.bookmarks.db.baseNode.children,
    state.bookmarks.db
  ]);
  const [selectedId, selectId] = useState('');
  const dispatch: (action: HighlightElementsMoved | ShowPopup) => any | void =
    useDispatch();

  let actions = [
      {
        title: props.copyOrMove === 'move' ? 'Move' : 'Copy',
        action: () => {
          props.toggleOverlay();
          if (!selectedId) return;

          if (props.copyOrMove === 'move') {
            try {
              for (let id of props.idList) {
                browserAPI.moveBk(id, { parentId: selectedId });
              }
            } catch (e: any) {
              return dispatch(
                showInfoPopup({
                  title: 'Move operation cancelled',
                  text: 'You were trying to move a folder within itself.'
                })
              );
            }
          } else {
            for (let id of props.idList) {
              let node = db.get(id);
              if (node)
                browserAPI.createBk({
                  index: 0,
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
