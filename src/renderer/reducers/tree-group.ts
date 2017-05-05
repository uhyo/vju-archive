// tree view of groups
import {
    Action,
} from '../actions/index';

export interface GroupTreeState{
    // root of current tree
    root: string | null;
    // id of current selected group
    current: string | null;
}

const initialData: GroupTreeState = {
    root: null,
    current: null,
};

export default function groupTreeReducer(state: GroupTreeState = initialData, action: Action){
    switch (action.type){
        case 'tree-group:set-root': {
            return {
                ...state,
                root: action.id,
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
