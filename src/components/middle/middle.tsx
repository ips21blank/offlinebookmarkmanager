import React from 'react';
import { DataNode, MiddleProps } from '@proj-types/types';
import { Content } from './content';
import { TopMenu } from './topMenu/topMenu';

export const Middle: React.FC<MiddleProps> = ({ db }) => {
  let chain: DataNode[] = db.getParentChain('159');

  return (
    <div id="main">
      <TopMenu parentChain={chain} />
      <Content db={db} />
    </div>
  );
};
