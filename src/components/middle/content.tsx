import React from "react";
import { TopMenuProps } from "../../types";
import { FolderFullView } from "../folderFullView/folderFullView";
import db from "../../db";

export const Content: React.FC<any> = (props) => {
  return (
    <div id="content">
      {(function () {
        let fol = db.get("1");
        if (fol) {
          return (
            <FolderFullView
              {...{ folder: fol, colCount: 4, direction: "column" }}
            />
          );
        } else {
          return "";
        }
      })()}
    </div>
  );
};
