import * as React from 'react';

import plugins from '../../plugins';

import {
    Item,
} from '../../types/item';

import {
    DraggableItem,
} from './draggable';

// 画像をひとつひとつ表示する感じ

export interface IPropScrollView{
    /**
     * Items to show.
     */
    items: Record<string, Item>;
    /**
     * Group to which items belong.
     */
    group?: string;
}

export default ({
    items,
    group,
}: IPropScrollView)=>{
    return <div>{
        /// TODO
        Object.keys(items).map(id=>{
            const item = items[id];
            return <DraggableItem key={id} tagName="div" id={id} group={group}>
                {plugins.renderItem(item)}
            </DraggableItem>;
        })
    }</div>;
};
