import {
  PinnedFolderProps,
  UpdateCurrLocation,
  RmvPin
} from '@proj-types/types';
import { useDispatch } from 'react-redux';
import { changeCurrLocation, rmvPin } from '@redux/redux';
import { BsX } from '@components/icons';
import { Utilities } from '@scripts/utilities';
import { useEffect } from 'react';
import { DragEventHandlers } from '@scripts/drag/drag-handlers';

const PinnedFolder: React.FC<PinnedFolderProps> = ({ node, isHomeLoc }) => {
  let pinClass = `inline-el-no-wrap-center${isHomeLoc ? ' home-pin' : ''}`;

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
        className="inline-el-no-wrap-center pin-title"
        id={Utilities.getPinId(node.id)}
      >
        {node.title}
      </span>{' '}
      <span className="btn-icon" onClick={removePinHandler}>
        <BsX />
      </span>
    </p>
  );
};

export { PinnedFolder };
