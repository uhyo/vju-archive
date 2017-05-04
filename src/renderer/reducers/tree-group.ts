// tree view of groups

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
    current: null,
};

export default function groupTreeReducer(state: GroupTreeState = initialData){
    return state;
}
