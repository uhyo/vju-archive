// tree view of groups
import {
    Action,
} from '../actions/index';

export interface GroupTreeState{
    // root of current tree
    roots: Array<string>;
    // id of current selected group
    current: string | null;
}

const initialData: GroupTreeState = {
    roots: [],
    current: null,
};

export default function groupTreeReducer(state: GroupTreeState = initialData, action: Action): GroupTreeState{
    switch (action.type){
        case 'tree-group:set-root': {
            return {
                ...state,
                roots: action.id,
            };
        }
        case 'tree-group:select-group': {
            return {
                ...state,
                current: action.id,
            };
        }
        default: {
            return state;
        }
    }
}
