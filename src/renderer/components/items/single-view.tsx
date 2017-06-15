import * as React from 'react';

import plugins from '../../plugins';
import {
    Item,
} from '../../types/item';

import {
    DraggableItem,
} from './draggable';

export interface IPropSingleView{
    /**
     * Item to show.
     */
    item: Item;
}

export default ({
    item,
}: IPropSingleView)=>{
    const {
        id,
    } = item;
    return <DraggableItem tagName="div" id={id}>
        {plugins.renderItem(item)}
    </DraggableItem>;
};
