import {
  AddressBarProps,
  DataNode,
  FolPageData,
  PAGE_TYPE,
  UpdateCurrLocation
} from '@proj-types/types';
import { changeCurrLocation, useAppSelector } from '@redux/redux';
import { BsHouseDoorFill, BsSearch, BsChevronRight } from '@components/icons';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

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
  let baseId = useAppSelector((store) => store.bookmarks.db.baseNodeId);
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
    let loc: string;
    switch (state.displayState.pageType) {
      case PAGE_TYPE.FOL: {
        let data = state.displayState.pageData as FolPageData;
        loc = data.currLocation;
        break;
      }
      default: {
        loc = '';
      }
    }
    return loc ? state.bookmarks.db.getParentChain(loc) : [];
  });

  return (
    <div id="address-bar-location" onClick={(e) => e.stopPropagation()}>
      {parentChain.map((node: DataNode) => (
        <AddressElement node={node} key={'addr-el-' + node.id} />
      ))}
      <HomeButton />
    </div>
  );
};

const SearchInput: React.FC<{
  onBlur: () => any | void;
}> = ({ onBlur }) => {
  const [q, setQ] = useState('');

  return (
    <input
      id="search-input"
      type="text"
      value={q}
      onChange={(e) => setQ(e.target.value)}
      onBlur={onBlur}
      onClick={(e) => e.stopPropagation()}
      autoFocus
    />
  );
};

export const AddressBar: React.FC<AddressBarProps> = (props) => {
  const [inputShown, setInputShown] = useState(false);
  const onClickHandler = (e: React.MouseEvent) => {
    setInputShown(!inputShown);
    e.stopPropagation();
  };

  let content: JSX.Element = inputShown ? (
    <SearchInput
      onBlur={() => {
        console.log('asdf');
        setInputShown(false);
      }}
    />
  ) : (
    <AddressLocation {...props} />
  );

  return (
    <div id="address-bar" onClick={onClickHandler}>
      {content}
      <span className="btn-icon">
        <BsSearch id="search" />
      </span>
    </div>
  );
};
