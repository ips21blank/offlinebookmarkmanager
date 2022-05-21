import { FolderColumnProps, FolderColumnsProps } from '@proj-types/types';
import { useAppSelector } from '@redux/hooks';
import { Utilities } from '@scripts/scripts';
import { FolderFullViewColumn } from './folder-full-view-column';

const FolderFullViewColumns: React.FC<FolderColumnsProps> = ({ nodeId }) => {
  // This component should be re-rendered if either of the following 2 changes.
  let [colCount, dispMode] = useAppSelector((state) => [
    state.displayState.noOfColumns,
    state.displayState.mode
  ]);
  let [nodes, groupBkmFol] = useAppSelector((state) => {
    let fol = state.bookmarks.db.get(nodeId);
    return [
      fol && fol.children ? fol.children : [],
      state.displayState.groupBkmFol
    ];
  });

  if (groupBkmFol) nodes = Utilities.sortNodesForGrouping(nodes);

  let colProps: FolderColumnProps[] = [];
  for (let colIndex = 1; colIndex <= colCount; colIndex++) {
    colProps.push({
      nodes,
      colCount,
      colIndex,
      dispMode
    });
  }

  return (
    <div className="folder-view-content">
      {colProps.map((prop) => (
        <FolderFullViewColumn
          {...prop}
          key={`full-view-column-${nodeId}-${prop.colIndex}/${colCount}`}
        />
      ))}
    </div>
  );
};

export { FolderFullViewColumns };
