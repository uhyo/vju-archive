
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

export type TreeGroupAction = SelectGroupAction;
