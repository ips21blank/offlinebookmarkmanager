import { DataNode } from '@proj-types/types';
import {
  BsChevronRight,
  BsChevronDown,
  BsFolder,
  BsFolder2Open
} from '@components/icons';
import { useState } from 'react';

const FolderSelector: React.FC<{
  node: DataNode;
  selectFol: (id: string) => void | any;
  selectedId: string;
}> = ({ node, selectFol, selectedId }) => {
  const [exp, toggleExp] = useState(false);

  if (node.url) {
    return <></>;
  }

  const expandFol = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleExp(!exp);
  };
  const selected = node.id === selectedId;

  return (
    <div className="folder-selector">
      <div className="select-fol">
        <span className="btn-icon" onClick={expandFol}>
          {exp ? <BsChevronDown /> : <BsChevronRight />}
        </span>
        <span
          className={`inline-el-no-wrap-center${selected ? ' selected' : ''}`}
          onClick={() => selectFol(node.id)}
        >
          {exp ? <BsFolder2Open /> : <BsFolder />}
          &nbsp;
          {node.title}
        </span>
      </div>
      <div className="folder-selector-subfolders">
        {exp &&
          node.children &&
          node.children.map((ch) => (
            <FolderSelector
              node={ch}
              selectFol={selectFol}
              key={`sel-fol-${ch.id}`}
              selectedId={selectedId}
            />
          ))}
      </div>
    </div>
  );
};

const SelectFolderComp: React.FC<{
  nodes: DataNode[];
  selectFol: (id: string) => void | any;
  selectedId: string;
}> = ({ nodes, selectFol, selectedId }) => {
  return (
    <div id="folder-selector-list">
      <p>Select target Folder</p>
      {nodes.map((node) => (
        <FolderSelector
          {...{ node, selectFol, selectedId }}
          key={`sel-fol-${node.id}`}
        />
      ))}
    </div>
  );
};

export { SelectFolderComp };
