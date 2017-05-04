// def. of groups

export type GroupType = 'folder';

/**
 * Document of groups in IndexedDB.
 */
export interface GroupDoc{
    // unique id of group
    id: string;
    // name of group
    name: string;
    // type of group
    type: GroupType;
    // children
    children: Array<string>;
    // id of tree
    treeId: string;
}

/**
 * Group data
 */
export interface Group extends GroupDoc{
    parent: string | null;
}
