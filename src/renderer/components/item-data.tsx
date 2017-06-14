import * as React from 'react';
import {
    Item,
} from '../types/item';
import {
    Group,
} from '../types/group';

import * as styles from '../css/item-data.css';

export interface IPropItemData{
    item: Item | null;
    groups: Array<Group>;
    onSelectGroup?(id: string): void;
}
const ItemData = ({
    item,
    groups,
    onSelectGroup,
}: IPropItemData)=>{
    if (item == null){
        return <div>
            <p>アイテムが選択されていません。</p>
        </div>
    }
    return <div>
        <p><b>{item.name}</b></p>
        <ul className={styles.groupList}>{
            groups.map(({id, name})=>{
                const handleClick = onSelectGroup && (()=>{
                    onSelectGroup(id);
                });
                return <li key={id} className={styles.group} onClick={handleClick}>{name}</li>;
            })
        }</ul>
    </div>
};
export default ItemData;
