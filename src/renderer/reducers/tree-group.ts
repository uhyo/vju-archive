// tree view of groups
import {
    Action,
} from '../actions/index';

export interface GroupTreeState{
    // parent of current tree
    parent: string | null;
    // id of current selected group
    current: string | null;
}

/*
const initialData: GroupTreeState = {
    parent: null,
    current: null,
};
*/
const initialData: GroupTreeState = {
    parent: 'group1',
    current: 'group2',
};

export default function groupTreeReducer(state: GroupTreeState = initialData, action: Action){
    if (action.type === 'tree-group:select-group'){
        return {
            ...state,
            current: action.id,
        };
    }
    return state;
}
