import { SrhPageData, FolderColumnProps } from '@proj-types/types';
import { useAppSelector } from '@redux/hooks';
import { FolderFullViewColumn } from './folderFullView/folder-full-view-column';

const SearchStats: React.FC<any> = (props) => {
  return <div id="search-stats">Stats</div>;
};

const SearchResults: React.FC<any> = (props: any) => {
  const [colCount, dispMode, loc, nodes] = useAppSelector((state) => {
    let data = state.displayState.pageData as SrhPageData;
    return [
      state.displayState.noOfColumns,
      state.displayState.mode,
      data.currLocation,
      data.orderedNodes
    ];
  });

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
    <div>
      <SearchStats />
      <div className="folder-view-content">
        {colProps.map((prop) => (
          <FolderFullViewColumn
            {...prop}
            key={`full-view-column-srh-${prop.colIndex}/${colCount}`}
          />
        ))}
      </div>
    </div>
  );
};

export { SearchResults };
