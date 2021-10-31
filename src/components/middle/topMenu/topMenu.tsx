import React from "react";
import { TopMenuProps } from "../../../types";

import { TopMenuButtons } from "./topMenuButtons";
import { AddressBar } from "./addressBar";

export const TopMenu: React.FC<TopMenuProps> = (props) => {
  return (
    <nav id="top-menu">
      <AddressBar />
      <TopMenuButtons />
    </nav>
  );
};
