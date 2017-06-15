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
    /**
     * Change currently selected item.
     */
    onChangeCurrentItem?(item: string): void;
    /**
     * Focus on some item.
     */
    onFocusItem?(item: string): void;
}

export default ({
    items,
    group,
    onChangeCurrentItem,
    onFocusItem,
}: IPropScrollView)=>{
    return <div>{
        /// TODO
        Object.keys(items).map(id=>{
            const item = items[id];
            const onClick = onChangeCurrentItem && (()=> onChangeCurrentItem(id));
            const onDoubleClick = onFocusItem && (()=> onFocusItem(id));
            const attributes = {
                onClick,
                onDoubleClick,
            };
            return <DraggableItem key={id} tagName="div" id={id} group={group} attributes={attributes}>
                {plugins.renderItem(item)}
            </DraggableItem>;
        })
    }</div>;
};
