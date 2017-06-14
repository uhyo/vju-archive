import * as React from 'react';

import {
    ItemsState,
} from '../../reducers/items';
import {
    ViewState,
} from '../../reducers/view';

import TableView from './table-view';
import ScrollView from './scroll-view';

import * as styles from '../../css/item-list.css';

export interface IPropItemList{
    items: ItemsState;
    view: ViewState;
    group: string;
    onChangeCurrentItem(item: string): void;
}
export default class ItemList extends React.Component<IPropItemList, {}>{
    render(){
        const {
            items: {
                items,
            },
            view: {
                view,
            },
            group,
            onChangeCurrentItem,
        } = this.props;
        // Temporal

        const keys = Object.keys(items);
        let viewelm;
        if (view.type === 'table-view'){
            viewelm = <TableView items={items} group={group} onChangeCurrentItem={onChangeCurrentItem} />;
        }else if (view.type === 'scroll-view'){
            viewelm = <ScrollView items={items} group={group} onChangeCurrentItem={onChangeCurrentItem} />;
        }
        return <div className={styles.listWrapper}>
            <div className={styles.listHeader}>
                {keys.length} items.
            </div>
            <div className={styles.listMain}>
                {viewelm}
            </div>
        </div>;
    }
}

