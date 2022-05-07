import {
  AddressBarProps,
  DataNode,
  FolPageData,
  PAGE_TYPE,
  UpdateCurrLocation
} from '@proj-types/types';
import {
  changeCurrLocation,
  searchNodes,
  showPrevPage,
  showSearchPage,
  useAppSelector
} from '@redux/redux';
import {
  BsHouseDoorFill,
  BsSearch,
  BsChevronRight,
  BsXLg
} from '@components/icons';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { DebounceCheck } from '@scripts/debounce';
import { GLOBAL_SETTINGS } from '@scripts/globals';
import { Utilities } from '@scripts/utilities';

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
  q: string;
  setQuery: (q: string) => void;
  loc: string;
}> = ({ q, setQuery, loc }) => {
  const [debouncer] = useState(
    new DebounceCheck(GLOBAL_SETTINGS.srhDelay, { obs: q })
  );
  const dispatch = useDispatch();
  const setQ = (q: string) => {
    setQuery(q);
    debouncer.obsVal = q;
    debouncer.debounce(() => dispatch(searchNodes(q, loc)));
  };

  return (
    <input
      id="search-input"
      type="text"
      value={q}
      onChange={(e) => setQ(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      autoFocus
    />
  );
};

export const AddressBar: React.FC<AddressBarProps> = (props) => {
  const [q, setQuery] = useState('');
  const [pgType, loc] = useAppSelector((state) => {
    return [
      state.displayState.pageType,
      Utilities.getCurrLoc(state.displayState)
    ];
  });
  const srhMode = pgType === PAGE_TYPE.SRH;
  const dispatch = useDispatch();

  if (!srhMode) {
    q && setQuery('');
  }

  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    srhMode ? dispatch(showPrevPage()) : dispatch(showSearchPage());
  };

  let [content, srhIcon] = srhMode
    ? [<SearchInput {...{ q, setQuery, loc }} />, <BsXLg />]
    : [<AddressLocation {...props} />, <BsSearch />];

  return (
    <div
      id="address-bar"
      onClick={(e) => !srhMode && dispatch(showSearchPage())}
    >
      {content}
      <span className="btn-icon" onClick={onClickHandler}>
        {srhIcon}
      </span>
    </div>
  );
};
