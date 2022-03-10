import {
  AddressBarProps,
  DataNode,
  SearchAndReloadProps
} from '@proj-types/types';
import { useAppSelector } from '@redux/redux';
import { BsHouseDoorFill, BsSearch } from '@components/icons';

const SearchButton: React.FC<SearchAndReloadProps> = (props) => {
  return (
    <div id="address-bar-buttons">
      {/* <button id="reload">&#x21BB;</button> */}
      {/* <!-- U+1F50E; : &#x1F50D; --> */}
      <BsSearch id="search" />
    </div>
  );
};

const AddressLocation: React.FC<AddressBarProps> = (props) => {
  let parentChain: DataNode[] = useAppSelector((state) =>
    state.bookmarks.getParentChain(state.displayState.currLocation)
  );

  return (
    <div id="address-bar-location">
      {parentChain.map((node: DataNode) => (
        <span key={node.id}>
          <span>{node.title}</span>
          <span></span>
        </span>
      ))}
      <span className="btn-icon">
        <BsHouseDoorFill />
      </span>
    </div>
  );
};

export const AddressBar: React.FC<AddressBarProps> = (props) => {
  return (
    <div id="address-bar">
      <AddressLocation {...props} />
      <span className="btn-icon">
        <SearchButton />
      </span>
    </div>
  );
};
