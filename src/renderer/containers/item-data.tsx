import * as React from 'react';
import {
    createSelector,
} from 'reselect';
import {
    connect,
} from 'react-redux';

import {
    selectGroupAction,
} from '../actions/tree-group';
import {
    State,
} from '../reducers';

import ItemDataComponent from '../components/item-data';

const itemSelector = createSelector(
    ({items: {items}}: State)=> items,
    ({groups: {groups}}: State)=> groups,
    ({view: {currentItem}}: State)=> currentItem,
    (items, groups, currentItem)=> {
        const item = currentItem && items[currentItem] || null;
        const itemgroups =
            item == null ? [] :
            item.groups.map(id=> groups[id]);
        return {
            item,
            groups: itemgroups,
        };
    },
);

const ItemDataContainer: React.ComponentClass<{}> = connect(
    itemSelector,
    (dispatch)=>({
        onSelectGroup(id){
            dispatch(selectGroupAction(id));
        },
    }),
)(ItemDataComponent);

export default ItemDataContainer;
