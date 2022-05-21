import React from 'react';
import { BsDot } from '@components/icons';
import { AsideProps } from '@proj-types/types';

export const Aside: React.FC<AsideProps> = (props) => {
  return (
    <aside>
      <BsDot /> <BsDot /> <BsDot />
    </aside>
  );
};
