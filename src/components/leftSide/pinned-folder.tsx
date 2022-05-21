import {
  PinnedFolderProps,
  UpdateCurrLocation,
  RmvPin,
  ShowCtxMenu,
  CtxMenuTypes
} from '@proj-types/types';
import { useDispatch } from 'react-redux';
import { changeCurrLocation, rmvPin, showCtxMenu } from '@redux/redux';
import { BsXSquare, BsCaretRightFill } from '@components/icons';
import { Utilities, DragEventHandlers } from '@scripts/scripts';
import React, { useEffect } from 'react';
import { FOLDER_CLASSES } from '@scripts/globals';

const PinnedFolder: React.FC<PinnedFolderProps> = ({
  node,
  isHomeLoc,
  isCurrLoc
}) => {
  let pinClass = `inline-el-no-wrap-center`;

  const dispatch: (action: UpdateCurrLocation | RmvPin | ShowCtxMenu) => any =
    useDispatch();
  const changeLocHandler = () => dispatch(changeCurrLocation(node.id));

  useEffect(() => {
    DragEventHandlers.addEventsToPin(node.id);
  });

  const removePinHandler = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(rmvPin(node.id));
  };
  const ctxMenuHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      showCtxMenu({
        node,
        x: e.clientX,
        y: e.clientY,
        rename: () => {},
        type: CtxMenuTypes.PIN_CTX_MENU
      })
    );
  };

  return (
    <p
      className={pinClass}
      onClick={changeLocHandler}
      onContextMenu={ctxMenuHandler}
    >
      <span
        className={`inline-el-no-wrap-center ${FOLDER_CLASSES.PIN_TITLE}${
          isCurrLoc ? ' curr-fol' : ''
        }`}
        id={Utilities.getPinId(node.id)}
      >
        {isHomeLoc ? <BsCaretRightFill /> : ''} &nbsp;
        {node.title}
      </span>{' '}
      <span className="btn-icon" onClick={removePinHandler}>
        <BsXSquare />
      </span>
    </p>
  );
};

export { PinnedFolder };
