import * as React from 'react';

import {
    ItemsState,
} from '../../reducers/items';
import {
    ViewState,
} from '../../reducers/view';

import TableView from './table-view';
import ScrollView from './scroll-view';
import SingleView from './single-view';

import * as styles from '../../css/item-list.css';

export interface IPropItemList{
    items: ItemsState;
    view: ViewState;
    group: string;
    onChangeCurrentItem(item: string): void;
    onFocusItem(item: string): void;
}
export default class ItemList extends React.Component<IPropItemList, {}>{
    render(){
        const {
            items: {
                items,
            },
            view: {
                view,
                currentItem,
            },
            group,
            onChangeCurrentItem,
            onFocusItem,
        } = this.props;
        // Temporal

        const keys = Object.keys(items);
        let listing = true;
        let viewelm;
        let lengthinfo;
        if (view.type === 'table-view'){
            viewelm = <TableView items={items} group={group} onChangeCurrentItem={onChangeCurrentItem} onFocusItem={onFocusItem} />;
        }else if (view.type === 'scroll-view'){
            viewelm = <ScrollView items={items} group={group} onChangeCurrentItem={onChangeCurrentItem} onFocusItem={onFocusItem} />;
        }else if (view.type === 'single-view'){
            listing = false;
            if (currentItem == null){
                viewelm = null;
            }else{
                const item = items[currentItem];
                viewelm = <SingleView item={item} zoom={view.zoom}/>;
            }
        }
        if (listing){
            lengthinfo =
                <div className={styles.listHeader}>
                    {keys.length} items.
                </div>;
        }else{
            lengthinfo = null;
        }
        return <div className={styles.listWrapper + (view.type === 'single-view' ? ' '+styles.listWrapperSingle : '')}>
            {lengthinfo}
            <div className={styles.listMain + (view.type === 'single-view' ? ' '+styles.listMainSingle : '')}>
                {viewelm}
            </div>
        </div>;
    }
}

