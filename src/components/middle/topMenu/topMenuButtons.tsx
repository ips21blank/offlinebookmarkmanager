import React from "react";
import {
  SearchAndReloadProps,
  TopMenuButtonsProps,
  TopMenuEditButtonsProps,
} from "../../../types";

export const TopMenuButtons: React.FC<TopMenuButtonsProps> = (props) => {
  return (
    <div id="top-menu-buttons">
      <button>Move</button>
      <button>Delete</button>
      <button>Group</button>
      <button>Edit</button>
    </div>
  );
};
