import { DataNode } from '@proj-types/types';
import { useAppSelector } from '@redux/hooks';
import {
  duplicatesSearch,
  updateDuplicateNodeParentChains
} from '@redux/redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DuplicateGroup } from './elements/duplicate-group';

const Duplicates: React.FC<any> = (props) => {
  const [nodeGroups, setNodeGroups] = useState([] as DataNode[][]);
  const nodeGroupsPromise = useAppSelector(
    (state) => state.bookmarks.duplicatesPromise || null
  );
  const showIcon = useAppSelector((s) => s.settings.showFolBkmIcons);
  const dispatch = useDispatch();
  console.log(showIcon);

  const selectedNodes = new Set<string>();
  const addRmvNode = (id: string, val: boolean) => {
    if (val) selectedNodes.add(id);
    else selectedNodes.delete(id);
  };

  useEffect(() => {
    dispatch(duplicatesSearch());
  }, []);
  useEffect(() => {
    nodeGroupsPromise &&
      nodeGroupsPromise.then((nodes) => {
        let allNodes = [] as DataNode[];
        for (let nodeGroup of nodes) allNodes.push(...nodeGroup);

        dispatch(updateDuplicateNodeParentChains(allNodes));
        setNodeGroups(nodes);
      });
  });

  return (
    <div id="duplicates-page">
      <div id="duplicates-controls">Top Buttons</div>
      <div id="node-groups">
        {nodeGroups.map((nodes) => (
          <DuplicateGroup
            {...{ nodes, addRmvNode, showIcon }}
            key={`dup-gr-${nodes[0].id}`}
          />
        ))}
      </div>
    </div>
  );
};

export { Duplicates };
