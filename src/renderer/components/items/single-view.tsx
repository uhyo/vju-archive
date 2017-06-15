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
    const attributes = {
        style: {
            height: '100%',
            fontSize: '0',
        },
    };
    return <DraggableItem tagName="div" id={id} attributes={attributes}>
        {plugins.renderItem(item, {fit: true})}
    </DraggableItem>;
};
