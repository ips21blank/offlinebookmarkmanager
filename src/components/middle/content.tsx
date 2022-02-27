import React from 'react';
import { ContentProps } from '@proj-types/types';
import { FolderFullView } from '../folderFullView/folderFullView';

export const Content: React.FC<ContentProps> = ({ db }) => {
  return (
    <div id="content">
      {(function () {
        let fol = db.get('1');
        if (fol) {
          return <FolderFullView {...{ folder: fol, colCount: 4 }} />;
        } else {
          return '';
        }
      })()}
    </div>
  );
};
