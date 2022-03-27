import {
  BsFolder as FolIcon,
  BsFillBookmarksFill as BkmIcon,
  BsGripVertical as Sep
} from '@components/icons';
import { DISP_MODES } from '@proj-types/settings-types';
import { useAppSelector } from '@redux/hooks';

const DragMultipleEl: React.FC<any> = (props) => {
  let [sel, mode] = useAppSelector((state) => [
    state.displayState.selection,
    state.displayState.mode
  ]);

  return mode === DISP_MODES.EDIT ? (
    <div id="drag-details" className="inline-el-no-wrap-center">
      <span>Selected: &nbsp;&nbsp;&nbsp;</span>
      <span id="drag-multiple-el" className="inline-el-no-wrap-center">
        <FolIcon /> : {sel.folCount} <Sep /> <BkmIcon /> : {sel.bkmCount}
      </span>
    </div>
  ) : (
    <></>
  );
};

export { DragMultipleEl };
