// Default plugin
import * as React from 'react';
import {
    Plugin,
} from '../../types/plugin';
import {
    Item,
} from '../../types/item';

export default class DefaultPlugin implements Plugin{
    canRenderItem(){
        return false;
    }
    renderItem(item: Item){
        return <div>
            <p>ファイル<b>{item.name}</b>を描画できません。</p>
        </div>;
    }
}
