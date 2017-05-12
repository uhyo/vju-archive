import {
    combineReducers,
} from 'redux';

import groupsReducer from './groups';
import treeGroupReducer from './tree-group';
import itemReducer from './items';
import viewReducer from './view';

const reducer = combineReducers({
    groups: groupsReducer,
    treeGroup: treeGroupReducer,
    items: itemReducer,
    view: viewReducer,
});

export default reducer;
