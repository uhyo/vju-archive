import {
    connect,
} from 'react-redux';

import {
    selectGroupAction,
} from '../actions/tree-group';

import TreeGroupComponent from '../components/tree-group';

const TreeGroupContainer = connect(
    ({groups, treeGroup})=>({groups, treeGroup}),
    (dispatch)=>({
        onSelect(id: string){
            dispatch(selectGroupAction(id));
        },
    }),
)(TreeGroupComponent);

export default TreeGroupContainer;
