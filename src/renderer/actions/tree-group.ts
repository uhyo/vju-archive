/**
 * Set root of current tree.
 */
export interface SetRootsAction{
    type: 'tree-group:set-root';
    id: Array<string>;
}
export function setRootsAction(id: Array<string>): SetRootsAction{
    return {
        type: 'tree-group:set-root',
        id,
    };
}
/**
 * Select a group.
 */
export interface SelectGroupAction{
    type: 'tree-group:select-group';
    id: string;
}
export function selectGroupAction(id: string): SelectGroupAction{
    return {
        type: 'tree-group:select-group',
        id,
    };
}

export type TreeGroupAction =
    SetRootsAction |
    SelectGroupAction;
