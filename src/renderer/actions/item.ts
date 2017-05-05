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
export type ItemsQuery = ParentGroupQuery;
/**
 * Query of items contained by a group.
 */
export interface ParentGroupQuery{
    type: 'parent-group';
    id: string;
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

export type ItemAction =
    LoadStartAction |
    LoadEndAction;

