import React from 'react';
import {
  TopMenuButtonsProps,
  TopMenuEditButtonsProps
} from '@proj-types/types';

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
