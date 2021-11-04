import React from "react";
import { DataNode, MiddleProps } from "../../types";
import { Content } from "./content";
import { TopMenu } from "./topMenu/topMenu";

import db from "../../db";

export const Middle: React.FC<MiddleProps> = (props) => {
  let chain: DataNode[] = db.getParentChain("159");

  return (
    <div id="main">
      <TopMenu parentChain={chain} />
      <Content />
    </div>
  );
};
