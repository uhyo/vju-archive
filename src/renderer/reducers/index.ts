import {
    combineReducers,
} from 'redux';

import groupsReducer from './groups';
import treeGroupReducer from './tree-group';
import itemReducer from './items';

const reducer = combineReducers({
    groups: groupsReducer,
    treeGroup: treeGroupReducer,
    items: itemReducer,
});

export default reducer;
