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
  toggleDispMode,
  toggleGrouping,
  useAppSelector
} from '@redux/redux';
import { BsVectorPen } from '@components/icons';

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
          <button>Move</button>
          <button>Delete</button>
        </>
      )}
      <EditButton {...{ mode, dispatch }} />
    </div>
  );
};
