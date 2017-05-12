import {
    Item,
} from '../types/item';

/**
 * Input action:
 * Start loading of items.
 */
export interface LoadStartAction{
    type: 'items:load-start';
    query: ItemsQuery;
}
export type ItemsQuery = ParentGroupQuery | HashQuery;
/**
 * Query of items contained by a group.
 */
export interface ParentGroupQuery{
    type: 'parent-group';
    id: string;
}
/**
 * Query of items by a hash.
 */
export interface HashQuery{
    type: 'hash';
    hash: string;
}

export function loadStartAction(query: ItemsQuery): LoadStartAction{
    return {
        type: 'items:load-start',
        query,
    };
}

/**
 * Output action:
 * Finished loading of items.
 */
export interface LoadEndAction{
    type: 'items:load-end';
    items: Record<string, Item>;
}
export function loadEndAction(items: Record<string, Item>): LoadEndAction{
    return {
        type: 'items:load-end',
        items,
    };
}

/**
 * Input action:
 * Open dialog to select new file.
 */
export interface OpenFileDialogAction{
    type: 'items:open-file-dialog';
}
export function openFileDialogAction(): OpenFileDialogAction{
    return {
        type: 'items:open-file-dialog',
    };
}

/**
 * Output action:
 * New item is added.
 */
export interface NewItemAddedAction{
    type: 'items:new-item-added';
    item: Item;
}
export function newItemAddedAction(item: Item): NewItemAddedAction{
    return {
        type: 'items:new-item-added',
        item,
    };
}

/**
 * Input action:
 * Item is moved/copied from a group to another group.
 */
export interface MoveCopyAction{
    type: 'items:move-copy';
    /**
     * Item id.
     */
    id: string;
    /**
     * move type.
     */
    action: 'move' | 'copy';
    /**
     * old group id.
     */
    oldGroup: string | undefined;
    /**
     * new group id.
     */
    newGroup: string;
}
export function moveCopyAction(id: string, action: 'move' | 'copy', oldGroup: string | undefined, newGroup: string): MoveCopyAction{
    return {
        type: 'items:move-copy',
        id,
        action,
        oldGroup,
        newGroup,
    };
}

export type ItemAction =
    LoadStartAction |
    LoadEndAction |
    OpenFileDialogAction |
    NewItemAddedAction |
    MoveCopyAction;

