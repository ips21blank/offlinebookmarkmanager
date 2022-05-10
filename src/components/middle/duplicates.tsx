import { FiRefreshCcw } from '@components/icons';
import { DataNode } from '@proj-types/types';
import { useAppSelector } from '@redux/hooks';
import {
  duplicatesSearch,
  updateDuplicateNodeParentChains
} from '@redux/redux';
import { browserAPI } from '@scripts/browser/browser-api';
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

  const [selectedNodes, setSelectedNodes] = useState(new Set<string>());

  const addRmvNode = (id: string, val: boolean) => {
    val ? selectedNodes.add(id) : selectedNodes.delete(id);

    setSelectedNodes(new Set<string>(selectedNodes));
  };
  const invertSel = () => {
    let newSel = new Set<string>();
    for (let ng of nodeGroups) {
      for (let node of ng) {
        if (!selectedNodes.has(node.id)) newSel.add(node.id);
      }
    }
    setSelectedNodes(newSel);
  };
  const selectFirsts = () => {
    let newSel = new Set<string>();
    for (let ng of nodeGroups) {
      newSel.add(ng[0].id);
    }
    setSelectedNodes(newSel);
  };
  const selectLasts = () => {
    let newSel = new Set<string>();
    for (let ng of nodeGroups) {
      newSel.add(ng[ng.length - 1].id);
    }
    setSelectedNodes(newSel);
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
      <div id="duplicates-controls">
        <span
          className="btn-icon"
          onClick={() => {
            setSelectedNodes(new Set<string>());
            dispatch(duplicatesSearch());
          }}
        >
          <FiRefreshCcw />
        </span>
        <span onClick={selectFirsts}>Select Firsts</span>
        <span onClick={selectLasts}>Select Lasts</span>
        <span onClick={invertSel}>Invert Selection</span>
        <span
          id="delete-duplicates"
          onClick={(e) => {
            const selectedNodeList = Array.from(selectedNodes);

            for (let nodeId of selectedNodeList) {
              browserAPI.removeBk(nodeId);
            }
            dispatch(duplicatesSearch());
          }}
        >
          Delete Selected
        </span>
      </div>
      <div id="node-groups">
        {nodeGroups.map((nodes) => (
          <DuplicateGroup
            {...{
              nodesAndSel: nodes.map((node) => [
                node,
                selectedNodes.has(node.id)
              ]),
              addRmvNode,
              showIcon
            }}
            key={`dup-gr-${nodes[0].id}`}
          />
        ))}
      </div>
    </div>
  );
};

export { Duplicates };
