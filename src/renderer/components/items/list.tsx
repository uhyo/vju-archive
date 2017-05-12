import * as React from 'react';

import {
    ItemsState,
} from '../../reducers/items';

import TableView from './table-view';

import * as styles from '../../css/item-list.css';

export interface IPropItemList{
    items: ItemsState;
    group: string;
}
export default class ItemList extends React.Component<IPropItemList, {}>{
    render(){
        const {
            items: {
                items,
            },
            group,
        } = this.props;
        // Temporal

        const keys = Object.keys(items);
        return <div className={styles.listWrapper}>
            <div className={styles.listHeader}>
                {keys.length} items.
            </div>
            <div className={styles.listMain}>
                <TableView items={items} group={group} />
            </div>
        </div>;
    }
}

