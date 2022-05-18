import {
  PinnedFolderProps,
  UpdateCurrLocation,
  RmvPin
} from '@proj-types/types';
import { useDispatch } from 'react-redux';
import { changeCurrLocation, rmvPin } from '@redux/redux';
import { BsXSquare, BsCaretRightFill } from '@components/icons';
import { Utilities } from '@scripts/utilities';
import { useEffect } from 'react';
import { DragEventHandlers } from '@scripts/drag/drag-handlers';
import { FOLDER_CLASSES } from '@scripts/globals';

const PinnedFolder: React.FC<PinnedFolderProps> = ({
  node,
  isHomeLoc,
  isCurrLoc
}) => {
  let pinClass = `inline-el-no-wrap-center`;

  const dispatch: (action: UpdateCurrLocation | RmvPin) => any = useDispatch();
  const changeLocHandler = () => dispatch(changeCurrLocation(node.id));

  const removePinHandler = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(rmvPin(node.id));
  };

  useEffect(() => {
    DragEventHandlers.addEventsToPin(node.id);
  });

  return (
    <p className={pinClass} onClick={changeLocHandler}>
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
