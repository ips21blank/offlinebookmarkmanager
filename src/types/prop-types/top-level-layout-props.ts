import { DataBase } from '@scripts/db';

/**
 * TOP LEVEL LAYOUT ELEMENTS
 * side menu
 * aside
 * middle
 */
interface _Common {
  db: DataBase;
}
interface SideMenuProps extends _Common {}
interface AsideProps extends _Common {}
interface MiddleProps extends _Common {}

export type { SideMenuProps, AsideProps, MiddleProps };
