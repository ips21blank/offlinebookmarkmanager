import { FolderContentProps, NodeProps } from '@proj-types/types';
import { Dispatch, SetStateAction, useState } from 'react';
import { Bookmark } from './bookmark';
import { BsFolder } from '@components/icons';
import { useAppSelector } from '@redux/hooks';

const states = {
  EXP: 'expanded',
  COL: 'collapsed'
};

const FolderContent: React.FC<FolderContentProps> = ({
  children,
  initialized
}) => {
  let showIcon = useAppSelector((state) => state.settings.showFolBkmIcons);
  // let [, setInitialized] = useState(false);
  return (
    <div className={'folder-children'}>
      {initialized && children
        ? children.map((child) =>
            child.url ? (
              <Bookmark node={child} showIcon={showIcon} />
            ) : (
              <Folder node={child} showIcon={showIcon} />
            )
          )
        : ''}
    </div>
  );
};

const Folder: React.FC<NodeProps> = ({ node, showIcon }) => {
  let [expColClass, setExpColClass]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState(states.COL);
  let [initialized, setInitialized] = useState(false);

  let expandColSubFol = () => {
    if (expColClass === states.COL) {
      setExpColClass(states.EXP);
      setInitialized(true);
    } else {
      setExpColClass(states.COL);
    }
  };

  return (
    <div className={'folder ' + expColClass}>
      <span
        onClick={expandColSubFol}
        className="inline-el-no-wrap-center"
        id={node.id}
      >
        {/* Following casuses performance issues */}
        {showIcon ? (
          <span className="folder-icon">
            <BsFolder />
          </span>
        ) : (
          ''
        )}
        {node.title}
      </span>
      <FolderContent children={node.children} initialized={initialized} />
    </div>
  );
};

export { Folder };
