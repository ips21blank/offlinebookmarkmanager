import { AddressBarProps, SearchAndReloadProps } from "../../../types";

const SearchAndReload: React.FC<SearchAndReloadProps> = (props) => {
  return (
    <div id="address-bar-buttons">
      <button id="reload">&#x21BB;</button>
      {/* <!-- U+1F50E; : &#x1F50D; --> */}
      <button id="search">🔍</button>
    </div>
  );
};

let addressString =
  "Current location is displayed here." +
  " But its too long." +
  " But its too long." +
  " But its too long." +
  " But its too long.";
const AddressLocation = () => (
  <div id="address-bar-location">
    {addressString
      .split(" ")
      .map((str: string, i: number) => {
        return (
          <span key={i}>
            <span>{str}</span>
            <span></span>
          </span>
        );
      })
      .reverse()}
  </div>
);

export const AddressBar: React.FC<AddressBarProps> = (props) => {
  return (
    <div id="address-bar">
      <AddressLocation />
      <SearchAndReload />
    </div>
  );
};
