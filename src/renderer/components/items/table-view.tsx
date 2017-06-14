import * as React from 'react';

import {
    Item,
} from '../../types/item';

import plugins from '../../plugins';

import * as styles from '../../css/table-view.css';

import {
    DraggableItem,
} from './draggable';

// テーブルを表示する

export interface IPropTableView{
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
}

export default ({
    items,
    group,
    onChangeCurrentItem,
}: IPropTableView)=>{
    return <table className={styles.table}>
        <thead>
            <tr>
                <th />
                <th>アイテム名</th>
                <th>ファイルの位置</th>
            </tr>
        </thead>
        <tbody>{
            // TODO
            Object.keys(items).map(id=>{
                const handleClick =
                    onChangeCurrentItem && (()=>{
                        onChangeCurrentItem(id);
                    });
                return <OneItem key={id} item={items[id]} group={group} onClick={handleClick} />;
            })
        }</tbody>
    </table>;
};

export interface IPropOneItem{
    item:Item;
    group?: string;
    onClick?(): void;
}
const OneItem = ({
    item,
    group,
    onClick,
}: IPropOneItem)=>{
    const {
        id,
        name,
        fullpath,
    } = item;
    const attr = {
        onClick,
    };
    return <DraggableItem tagName="tr" id={id} group={group} attributes={attr}>
        <td>{plugins.renderIcon(item)}</td>
        <td>{name}</td>
        <td>{fullpath}</td>
    </DraggableItem>;
};
