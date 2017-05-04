import {
    connect,
} from 'react-redux';

import TreeGroupComponent from '../components/tree-group';

const TreeGroupContainer = connect(
    ({groups, treeGroup})=>({groups, treeGroup}),
)(TreeGroupComponent);

export default TreeGroupContainer;
