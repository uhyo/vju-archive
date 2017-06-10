import * as React from 'react';
import {
    connect,
} from 'react-redux';

import ItemListComponent from '../components/items/list';

const ItemListContainer: React.ComponentClass<{}> = connect(
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
