import {
  AddressBarProps,
  DataNode,
  SearchAndReloadProps,
} from "../../../types";

const SearchAndReload: React.FC<SearchAndReloadProps> = (props) => {
  return (
    <div id="address-bar-buttons">
      <button id="reload">&#x21BB;</button>
      {/* <!-- U+1F50E; : &#x1F50D; --> */}
      <button id="search">🔍</button>
    </div>
  );
};

// let addressString =
//   "Current location is displayed here." +
//   " But its too long." +
//   " But its too long." +
//   " But its too long." +
//   " But its too long.";
// const AddressLocation = () => (
//   <div id="address-bar-location">
//     {addressString
//       .split(" ")
//       .map((str: string, i: number) => {
//         return (
//           <span key={i}>
//             <span>{str}</span>
//             <span></span>
//           </span>
//         );
//       })
//       .reverse()}
//   </div>
// );

const AddressLocation: React.FC<AddressBarProps> = ({ parentChain }) => (
  <div id="address-bar-location">
    {parentChain.map((node: DataNode, i: number) => {
      return (
        <span key={node.id}>
          <span>{node.title}</span>
          <span></span>
        </span>
      );
    })}
  </div>
);

export const AddressBar: React.FC<AddressBarProps> = (props) => {
  return (
    <div id="address-bar">
      <AddressLocation {...props} />
      <SearchAndReload />
    </div>
  );
};
