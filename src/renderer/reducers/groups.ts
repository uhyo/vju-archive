// holds group data in memory
import {
    Group,
} from '../types/group';

export interface GroupsState{
    groups: Record<string, Group>;
}
/*
const initialData: GroupsState = {
    groups: {
    },
};
*/

const initialData: GroupsState = {
    groups: {
        'group1': {
            id: 'group1',
            name: 'ぐる〜〜ぷ',
            type: 'folder',
            parent: null,
            treeId: 'tree1',
            children: ['group2', 'group3'],
        },
        'group2': {
            id: 'group2',
            name: 'グループ2',
            type: 'folder',
            parent: 'group1',
            treeId: 'tree1',
            children: ['group4'],
        },
        'group3': {
            id: 'group3',
            name: 'グループ3',
            type: 'folder',
            parent: 'group1',
            treeId: 'tree1',
            children: [],
        },
        'group4': {
            id: 'group4',
            name: '群4',
            type: 'folder',
            parent: 'group2',
            treeId: 'tree1',
            children: [],
        },
    },
};

export default function groupReducer(state: GroupsState = initialData){
    return state;
}
