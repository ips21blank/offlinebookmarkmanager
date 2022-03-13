import { FolderColumnProps, FolderColumnsProps } from '@proj-types/types';
import { useAppSelector } from '@redux/hooks';
import { FolderFullViewColumn } from './folder-full-view-column';

const FolderFullViewColumns: React.FC<FolderColumnsProps> = ({ nodeId }) => {
  // This component should be re-rendered if either of the following 2 changes.
  let colCount = useAppSelector((state) => state.displayState.noOfColumns);
  let nodes = useAppSelector((state) => {
    let fol = state.bookmarks.get(nodeId);
    return fol && fol.children ? fol.children : [];
  });

  let colProps: FolderColumnProps[] = [];
  for (let index = 1; index <= colCount; index++) {
    colProps.push({
      nodes,
      colCount,
      index
    });
  }

  return (
    <div className="folder-view-content">
      {colProps.map((prop) => (
        <FolderFullViewColumn
          {...prop}
          key={`full-view-column-${nodeId}-${prop.index}/${colCount}`}
        />
      ))}
    </div>
  );
};

export { FolderFullViewColumns };
