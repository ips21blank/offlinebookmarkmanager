import React from 'react';
import {
  DISP_MODES,
  FLOW_DIRECTION,
  TopMenuButtonsProps
} from '@proj-types/types';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import {
  changeFlowDirection,
  showConfirmPopup,
  showInfoPopup,
  showMovePopup,
  toggleDispMode,
  toggleGrouping,
  useAppSelector
} from '@redux/redux';
import { BsVectorPen } from '@components/icons';
import { browserAPI } from '@scripts/browser/browser-api';

const EditButton: React.FC<{
  mode: DISP_MODES;
  dispatch: (act: any) => any | void;
}> = ({ mode, dispatch }) => {
  const clickHandler = (e: React.MouseEvent) => dispatch(toggleDispMode());
  return (
    <button onClick={clickHandler} className="inline-el-no-wrap-center-both">
      <span className="btn-icon">
        <BsVectorPen />
      </span>
      {mode === DISP_MODES.EDIT ? 'Done' : 'Edit'}
    </button>
  );
};

const ToggleGroupButton: React.FC<{
  grouped: boolean;
  dispatch: (act: any) => any | void;
}> = ({ grouped, dispatch }) => {
  const clickHandler = (e: React.MouseEvent) => dispatch(toggleGrouping());
  return (
    <button onClick={clickHandler} className="inline-el-no-wrap-center-both">
      {/* <span className="btn-icon">
        <BsVectorPen />
      </span> */}
      {grouped ? 'Undo Group' : 'Group'}
    </button>
  );
};

const ToggleFlowDirButton: React.FC<{
  direction: FLOW_DIRECTION;
  dispatch: (act: any) => any | void;
}> = ({ direction, dispatch }) => {
  const isRowDir = direction === FLOW_DIRECTION.ROW;
  const clickHandler = (e: React.MouseEvent) =>
    dispatch(
      changeFlowDirection(isRowDir ? FLOW_DIRECTION.COLUMN : FLOW_DIRECTION.ROW)
    );
  return (
    <button onClick={clickHandler}>
      {isRowDir ? 'Row-Wise' : 'Column-Wise'}
    </button>
  );
};

const MoveButton: React.FC<{ dispatch: (act: any) => any | void }> = ({
  dispatch
}) => {
  const idList: string[] = useAppSelector((state) => [
    ...state.displayState.selection.bookmarks,
    ...state.displayState.selection.folders
  ]);
  const title = 'Move Selected',
    text = 'Please select something first.';
  const clickHandler = (e: React.MouseEvent) => {
    if (!idList.length) {
      dispatch(showInfoPopup({ title, text }));
    } else {
      dispatch(showMovePopup({ title, idList }));
    }
  };

  return <button onClick={clickHandler}>Move</button>;
};

const DeleteButton: React.FC<{ dispatch: (act: any) => any | void }> = ({
  dispatch
}) => {
  const [bkms, fols]: [string[], string[]] = useAppSelector((state) => [
    state.displayState.selection.bookmarks,
    state.displayState.selection.folders
  ]);
  let title = 'Delete Selected',
    text = 'Please select something first.';
  const clickHandler = (e: React.MouseEvent) => {
    if (!(bkms.length + fols.length)) {
      dispatch(showInfoPopup({ title, text }));
    } else {
      text = `Are you sure you want to delete ${
        fols.length ? fols.length + ' FOLDERS' : ''
      } ${fols.length && bkms.length ? 'and' : ''} ${
        bkms.length ? bkms.length + ' Bookmarks' : ''
      }?`;
      dispatch(
        showConfirmPopup({
          title,
          text,
          action: () => {
            for (let id of bkms) browserAPI.removeBk(id);
            for (let id of fols) browserAPI.removeBk(id);
          }
        })
      );
    }
  };

  return <button onClick={clickHandler}>Delete</button>;
};

export const TopMenuButtons: React.FC<TopMenuButtonsProps> = (props) => {
  const [grouped, mode, direction] = useAppSelector((state) => [
    state.displayState.groupBkmFol,
    state.displayState.mode,
    state.settings.flowDirection
  ]);
  const dispatch: Dispatch<any> = useDispatch();

  return (
    <div id="top-menu-buttons" className="inline-el-no-wrap-center-both">
      {mode === DISP_MODES.VIEW ? (
        <>
          <ToggleFlowDirButton {...{ direction, dispatch }} />
          <ToggleGroupButton {...{ grouped, dispatch }} />
        </>
      ) : (
        <>
          <MoveButton dispatch={dispatch} />
          <DeleteButton dispatch={dispatch} />
        </>
      )}
      <EditButton {...{ mode, dispatch }} />
    </div>
  );
};
