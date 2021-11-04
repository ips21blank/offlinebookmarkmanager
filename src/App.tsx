import { SideMenu } from "./components/leftSide/sideMenu";
import { Middle } from "./components/middle/middle";
import { Aside } from "./components/rightSide/aside";

import "./sass/style.scss";

export const App: React.FC<any> = () => {
  return (
    <>
      <SideMenu />
      <Middle />
      <Aside />
    </>
  );
};
