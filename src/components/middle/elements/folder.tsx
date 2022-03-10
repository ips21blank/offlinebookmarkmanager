import { FolderContentProps, NodeProps } from '@proj-types/types';
import { Dispatch, SetStateAction, useState } from 'react';
import { Bookmark } from './bookmark';
import { BsFolder } from '@components/icons';

const states = {
  EXP: 'expanded',
  COL: 'collapsed'
};

const FolderContent: React.FC<FolderContentProps> = ({
  children,
  initialized
}) => {
  // let [, setInitialized] = useState(false);
  return (
    <div className={'folder-children'}>
      {initialized && children
        ? children.map((child) =>
            child.url ? <Bookmark node={child} /> : <Folder node={child} />
          )
        : ''}
    </div>
  );
};

const Folder: React.FC<NodeProps> = ({ node }) => {
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
      <span onClick={expandColSubFol} className="inline-el-no-wrap-center">
        <span className="folder-icon">
          <BsFolder />
        </span>
        {node.title}
      </span>
      <FolderContent children={node.children} initialized={initialized} />
    </div>
  );
};

export { Folder };
