import { DataNode } from '@proj-types/browser-types';
import { browserEventsAPI } from './browser-api';

import { store } from '@redux/store';
import {
  rmvNode,
  movNode,
  changeNode,
  reorderNode,
  createNode
} from '@redux/redux';

const addListenersToBrowser = () => {
  // browserEventsAPI.create;
  browserEventsAPI.create((id: string, node: DataNode) => {
    store.dispatch(createNode(id, node));
  });

  // browserEventsAPI.remove;
  browserEventsAPI.remove(
    (
      id: string,
      removeInfo: {
        index: number;
        parentId: string;
        node: DataNode;
      }
    ) => {
      store.dispatch(rmvNode(id));
    }
  );

  // browserEventsAPI.remove;
  browserEventsAPI.removeTr(
    (
      id: string,
      removeInfo: {
        index: number;
        parentId: string;
        node: DataNode;
      }
    ) => {
      store.dispatch(rmvNode(id));
    }
  );

  // browserEventsAPI.edit;
  browserEventsAPI.edit(
    (
      id: string,
      changeInfo: {
        url?: string;
        title: string;
      }
    ) => {
      store.dispatch(changeNode(id, changeInfo));
    }
  );

  // browserEventsAPI.move;
  browserEventsAPI.move(
    (
      id: string,
      moveInfo: {
        index: number;
        oldIndex: number;
        parentId: string;
        oldParentId: string;
      }
    ) => {
      store.dispatch(movNode(id, moveInfo.parentId, moveInfo.index));
    }
  );

  // browserEventsAPI.chReord;
  // browserEventsAPI.chReord(
  //   (id: string, reorderInfo: { childIds: string[] }) => {
  //     store.dispatch(reorderNode(id, reorderInfo.childIds));
  //   }
  // );

  // browserEventsAPI.impEnd;
  // browserEventsAPI.impEnd(() => {});

  // browserEventsAPI.store;
  // browserEventsAPI.store(
  //   (
  //     changes: {
  //       [key: string]: { newValue?: any; oldValue?: any };
  //     },
  //     areaName: 'sync' | 'local' | 'managed'
  //   ) => {
  //     throw new Error('Listner for browser store event not implemented yet.');
  //   }
  // );
};

export { addListenersToBrowser };
