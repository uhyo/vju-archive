import {
    combineReducers,
} from 'redux';

import groupsReducer, {
    GroupsState,
} from './groups';
import treeGroupReducer, {
    GroupTreeState,
} from './tree-group';
import itemReducer, {
    ItemsState,
} from './items';
import viewReducer, {
    ViewState,
} from './view';

const reducer = combineReducers({
    groups: groupsReducer,
    treeGroup: treeGroupReducer,
    items: itemReducer,
    view: viewReducer,
});

// これはinferされるけど一応
export type State = {
    groups: GroupsState;
    treeGroup: GroupTreeState;
    items: ItemsState;
    view: ViewState;
};

export default reducer;
