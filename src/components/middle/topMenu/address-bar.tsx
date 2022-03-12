import {
  AddressBarProps,
  DataNode,
  UpdateCurrLocation
} from '@proj-types/types';
import { changeCurrLocation, useAppSelector } from '@redux/redux';
import { BsHouseDoorFill, BsSearch, BsChevronRight } from '@components/icons';
import { useDispatch } from 'react-redux';

const AddressElement: React.FC<{ node: DataNode }> = ({ node }) => {
  const dispatchAction: (action: UpdateCurrLocation) => any = useDispatch();
  const clickHandler = () => dispatchAction(changeCurrLocation(node.id));

  return (
    <span key={node.id}>
      <span onClick={clickHandler} className="address-location">
        {node.title}{' '}
      </span>
      <BsChevronRight />
    </span>
  );
};

const HomeButton: React.FC<any> = (props) => {
  let baseId = useAppSelector((store) => store.bookmarks.baseNodeId);
  const dispatchAction: (action: UpdateCurrLocation) => any = useDispatch();
  const clickHandler = () => dispatchAction(changeCurrLocation(baseId));

  return (
    <span className="btn-icon" onClick={clickHandler}>
      <BsHouseDoorFill />
    </span>
  );
};

const AddressLocation: React.FC<AddressBarProps> = (props) => {
  let parentChain: DataNode[] = useAppSelector((state) => {
    let loc = state.displayState.currLocation;
    return loc ? state.bookmarks.getParentChain(loc) : [];
  });

  return (
    <div id="address-bar-location">
      {parentChain.map((node: DataNode) => (
        <AddressElement node={node} key={'addr-el-' + node.id} />
      ))}
      <HomeButton />
    </div>
  );
};

export const AddressBar: React.FC<AddressBarProps> = (props) => {
  return (
    <div id="address-bar">
      <AddressLocation {...props} />
      <span className="btn-icon">
        <BsSearch id="search" />
      </span>
    </div>
  );
};
