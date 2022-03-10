import { PinnedFolderProps } from '@proj-types/types';
import { useDispatch } from 'react-redux';
import { BsX } from '@components/icons';

const PinnedFolder: React.FC<PinnedFolderProps> = ({
  title,
  targetId,
  isHomeLoc
}) => {
  let pinClass = `inline-el-no-wrap-center${isHomeLoc ? ' home-pin' : ''}`;
  useDispatch;

  return (
    <p className={pinClass}>
      <span className="pin-title">{title}asdfasdfasdf asdfasdfasdf</span>{' '}
      <span className="btn-icon">
        <BsX />
      </span>
    </p>
  );
};

export { PinnedFolder };
