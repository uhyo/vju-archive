/**
 * Set root of current tree.
 */
export interface SetRootAction{
    type: 'tree-group:set-root';
    id: string;
}
export function setRootAction(id: string): SetRootAction{
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
    SetRootAction |
    SelectGroupAction;
