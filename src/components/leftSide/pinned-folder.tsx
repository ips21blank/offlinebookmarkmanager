import { PinnedFolderProps, UpdateCurrLocation } from '@proj-types/types';
import { useDispatch } from 'react-redux';
import { changeCurrLocation } from '@redux/redux';
import { BsX } from '@components/icons';

const PinnedFolder: React.FC<PinnedFolderProps> = ({ node, isHomeLoc }) => {
  let pinClass = `inline-el-no-wrap-center${isHomeLoc ? ' home-pin' : ''}`;

  const dispatchAction: (action: UpdateCurrLocation) => any = useDispatch();
  const changeLocHandler = () => dispatchAction(changeCurrLocation(node.id));

  const removePinHandler = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return (
    <p className={pinClass} onClick={changeLocHandler}>
      <span className="inline-el-no-wrap-center pin-title" draggable={true}>
        {node.title}
      </span>{' '}
      <span className="btn-icon" onClick={removePinHandler}>
        <BsX />
      </span>
    </p>
  );
};

export { PinnedFolder };
