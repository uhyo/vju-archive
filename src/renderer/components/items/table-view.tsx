import * as React from 'react';

import {
    Item,
} from '../../types/item';

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
}

export default ({
    items,
    group,
}: IPropTableView)=>{
    return <table className={styles.table}>
        <thead>
            <tr>
                <th>アイテム名</th>
                <th>ファイルの位置</th>
            </tr>
        </thead>
        <tbody>{
            // TODO
            Object.keys(items).map(id=>{
                return <OneItem key={id} item={items[id]} group={group} />;
            })
        }</tbody>
    </table>;
};

export interface IPropOneItem{
    item:Item;
    group?: string;
}
const OneItem = ({
    item: {
        id,
        name,
        fullpath,
    },
    group,
}: IPropOneItem)=>{
    return <DraggableItem tagName="tr" id={id} group={group}>
        <td>{name}</td>
        <td>{fullpath}</td>
    </DraggableItem>;
};
