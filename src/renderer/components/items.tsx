import * as React from 'react';

import {
    ItemsState,
} from '../reducers/items';

export interface IPropItems{
    items: ItemsState;
}
export default class Items extends React.Component<IPropItems, {}>{
    render(){
        const {
            items: {
                items,
            },
        } = this.props;
        // Temporal

        const keys = Object.keys(items);
        return <div>
            <p>{keys.length} items.</p>
            {
                keys.map(id=>{
                    const item = items[id];
                    return <p key={id}>{item.fullpath}</p>;
                })
            }
        </div>;
    }
}
