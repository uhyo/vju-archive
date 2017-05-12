import {
    connect,
} from 'react-redux';

import ItemListComponent from '../components/items/list';

const ItemListContainer = connect(
    ({
        items,
        treeGroup: {
            current,
        },
    })=>({
        items,
        group: current || void 0,
    }),
)(ItemListComponent);

export default ItemListContainer;
