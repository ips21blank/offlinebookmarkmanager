import {
  AddressBarProps,
  DataNode,
  SearchAndReloadProps
} from '@proj-types/types';
import { useAppSelector } from '@redux/redux';

const SearchAndReload: React.FC<SearchAndReloadProps> = (props) => {
  return (
    <div id="address-bar-buttons">
      <button id="reload">&#x21BB;</button>
      {/* <!-- U+1F50E; : &#x1F50D; --> */}
      <button id="search">🔍</button>
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
    </div>
  );
};

export const AddressBar: React.FC<AddressBarProps> = (props) => {
  return (
    <div id="address-bar">
      <AddressLocation {...props} />
      <SearchAndReload />
    </div>
  );
};
