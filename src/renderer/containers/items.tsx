import * as React from 'react';
import {
    connect,
} from 'react-redux';

import {
    setCurrentItemAction,
    focusItemAction,
    changeViewAction,
} from '../actions/view';
import {
    View,
} from '../types/view';

import ItemListComponent from '../components/items/index';

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
        onFocusItem(id: string){
            dispatch(focusItemAction(id));
        },
        onChangeView(view: View){
            dispatch(changeViewAction(view));
        },
    }),
)(ItemListComponent);

export default ItemListContainer;
