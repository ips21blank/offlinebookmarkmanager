import React from 'react';
import { ContentProps, DataNode } from '@proj-types/types';
import { FolderFullView } from '../folderFullView/folderFullView';
import { useAppSelector } from '@redux/redux';

export const Content: React.FC<ContentProps> = (props) => {
  let folder: DataNode | undefined = useAppSelector((state) =>
    state.bookmarks.get('1')
  );

  return (
    <div id="content">
      {(function () {
        if (folder) {
          return <FolderFullView {...{ folder: folder, colCount: 4 }} />;
        } else {
          return '';
        }
      })()}
    </div>
  );
};
