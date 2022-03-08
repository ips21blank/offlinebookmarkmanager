import React from 'react';
import { ContentProps, DataNode } from '@proj-types/types';
import { FolderFullView } from './folderFullView/folderFullView';
import { useAppSelector } from '@redux/redux';

export const Content: React.FC<ContentProps> = (props) => {
  let folders = useAppSelector((state) => state.displayState.currFolders);

  return (
    <div id="content">
      {folders.map((fol) => (
        <FolderFullView nodeId={fol} key={'full-view-' + fol} />
      ))}
    </div>
  );
};
