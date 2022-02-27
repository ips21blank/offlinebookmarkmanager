import { DataNode } from '../browser-types';

/**
 * TOP-MENU AND ADDRESS BAR PROPS
 */
interface TopMenuProps {
  parentChain: DataNode[];
}
interface AddressBarProps extends TopMenuProps {}
interface TopMenuButtonsProps {}
interface SearchAndReloadProps {}
interface TopMenuEditButtonsProps {}

export type {
  TopMenuProps,
  AddressBarProps,
  TopMenuButtonsProps,
  SearchAndReloadProps,
  TopMenuEditButtonsProps
};
