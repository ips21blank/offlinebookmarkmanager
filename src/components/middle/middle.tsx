import React from "react";
import { MiddleProps } from "../../types";
import { Content } from "./content";
import { TopMenu } from "./topMenu/topMenu";

export const Middle: React.FC<MiddleProps> = (props) => {
  return (
    <div id="main">
      <TopMenu />
      <Content />
    </div>
  );
};
