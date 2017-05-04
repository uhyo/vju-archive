import {
    combineReducers,
} from 'redux';

import groupsReducer from './groups';
import treeGroupReducer from './tree-group';

const reducer = combineReducers({
    groups: groupsReducer,
    treeGroup: treeGroupReducer,
});

export default reducer;
