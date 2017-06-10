import * as React from 'react';
import {
    connect,
} from 'react-redux';

import {
    selectGroupAction,
} from '../actions/tree-group';

import {
    moveCopyAction,
} from '../actions/item';

import TreeGroupComponent from '../components/tree-group';

const TreeGroupContainer: React.ComponentClass<{}> = connect(
    ({groups, treeGroup})=>({groups, treeGroup}),
    (dispatch)=>({
        onSelect(id: string){
            dispatch(selectGroupAction(id));
        },
        onItemDrop(id: string, action: 'move' | 'copy', oldGroup: string | undefined, newGroup: string){
            dispatch(moveCopyAction(id, action, oldGroup, newGroup));
        },
    }),
)(TreeGroupComponent);

export default TreeGroupContainer;
