// holds group data in memory
import {
    Group,
} from '../types/group';
import {
    Action,
} from '../actions/index';

export interface GroupsState{
    groups: Record<string, Group>;
}

const initialData: GroupsState = {
    groups: {
    },
};

export default function groupReducer(state: GroupsState = initialData, action: Action){
    if (action.type === 'group:load-end'){
        return {
            groups: action.groups,
        };
    }
    return state;
}
