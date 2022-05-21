import { DataNode } from '@proj-types/types';
import { browserEventsAPI } from './browser-api';

import { getStore } from '@redux/store';
import {
  rmvNode,
  movNode,
  changeNode,
  reorderNode,
  createNode,
  rmvPin
} from '@redux/redux';

const addListenersToBrowser = () => {
  // browserEventsAPI.create;
  browserEventsAPI.create((id: string, node: DataNode) => {
    getStore().dispatch(createNode(id, node));
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
      getStore().dispatch(rmvNode(id));
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
      getStore().dispatch(rmvNode(id));
      getStore().dispatch(rmvPin(id));
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
      getStore().dispatch(changeNode(id, changeInfo));
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
      getStore().dispatch(movNode(id, moveInfo.parentId, moveInfo.index));
    }
  );

  // browserEventsAPI.chReord;
  browserEventsAPI.chReord(
    (id: string, reorderInfo: { childIds: string[] }) => {
      getStore().dispatch(reorderNode(id, reorderInfo.childIds));
    }
  );

  // browserEventsAPI.impEnd;
  browserEventsAPI.impEnd(() => {});

  // browserEventsAPI.store;
  browserEventsAPI.store(
    (
      changes: {
        [key: string]: { newValue?: any; oldValue?: any };
      },
      areaName: 'sync' | 'local' | 'managed'
    ) => {
      throw new Error('Listner for browser store event not implemented yet.');
    }
  );
};

export { addListenersToBrowser };
