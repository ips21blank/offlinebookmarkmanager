import { SideMenu } from '@components/leftSide/sideMenu';
import { Middle } from '@components/middle/middle';
import { Aside } from '@components/rightSide/aside';

import './sass/style.scss';
import { DataBase } from '@scripts/db';
import data from '@scripts/testData';

let db: DataBase = new DataBase([data]);

export const App: React.FC<any> = () => {
  return (
    <>
      <SideMenu db={db} />
      <Middle db={db} />
      <Aside db={db} />
    </>
  );
};
