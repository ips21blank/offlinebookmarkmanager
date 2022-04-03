import {
  PinnedFolderProps,
  UpdateCurrLocation,
  RmvPin
} from '@proj-types/types';
import { useDispatch } from 'react-redux';
import { changeCurrLocation, rmvPin } from '@redux/redux';
import { BsX } from '@components/icons';

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

  return (
    <p className={pinClass} onClick={changeLocHandler}>
      <span className="inline-el-no-wrap-center pin-title">{node.title}</span>{' '}
      <span className="btn-icon" onClick={removePinHandler}>
        <BsX />
      </span>
    </p>
  );
};

export { PinnedFolder };
