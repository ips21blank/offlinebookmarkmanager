import { DataNode } from '@proj-types/types';
import { useAppSelector } from '@redux/hooks';
import { duplicatesSearch } from '@redux/redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DuplicateGroup } from './elements/duplicate-group';

const Duplicats: React.FC<any> = (props) => {
  const [nodeGroups, setNodeGroups] = useState([] as DataNode[][]);
  const nodeGroupsPromise = useAppSelector(
    (state) => state.bookmarks.duplicatesPromise || null
  );
  const dispatch = useDispatch();

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
      nodeGroupsPromise.then((nodes) => setNodeGroups(nodes));
  });

  return (
    <div>
      <div>Top Buttons</div>
      {nodeGroups.map((nodes) => (
        <DuplicateGroup {...{ nodes, addRmvNode }} />
      ))}
    </div>
  );
};

export { Duplicats };
