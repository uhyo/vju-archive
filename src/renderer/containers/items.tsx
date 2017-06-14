import * as React from 'react';
import {
    connect,
} from 'react-redux';

import {
    setCurrentItemAction,
} from '../actions/view';

import ItemListComponent from '../components/items/list';

const ItemListContainer: React.ComponentClass<{}> = connect(
    ({
        items,
        view,
        treeGroup: {
            current,
        },
    })=>({
        items,
        view,
        group: current || void 0,
    }),
    (dispatch)=>({
        onChangeCurrentItem(id: string){
            dispatch(setCurrentItemAction(id));
        },
    }),
)(ItemListComponent);

export default ItemListContainer;
