import {
  BsFolder as FolIcon,
  BsFillBookmarksFill as BkmIcon,
  BsGripVertical as Sep,
  BsLink45Deg as BkmIcon2
} from '@components/icons';
import { DataNode } from '@proj-types/browser-types';
import { useAppSelector } from '@redux/hooks';

const DragNode: React.FC<{ node: DataNode }> = ({ node }) => {
  let img = node.url ? <BkmIcon2 /> : <FolIcon />;

  return (
    <>
      {img} &nbsp; {node.title || node.url}
    </>
  );
};

const DragEl: React.FC<any> = (props) => {
  let [sel, dragNode] = useAppSelector((state) => [
    state.displayState.selection,
    state.bookmarks.db.get(state.displayState.dragId)
  ]);

  let dragElement: JSX.Element =
    sel.total === 1 && dragNode ? (
      <DragNode node={dragNode} />
    ) : (
      <>
        <FolIcon /> : {sel.folCount} <Sep /> <BkmIcon /> : {sel.bkmCount}
      </>
    );

  return (
    // <div id="drag-details" className="inline-el-no-wrap-center">

    <span id="drag-elements-el" className="inline-el-no-wrap-center">
      {/* <span>Selected: &nbsp;&nbsp;&nbsp;</span> */}
      {dragElement}
      {/* </div> */}
    </span>
  );
};

export { DragEl };
