// Default plugin
import * as React from 'react';
import {
    Plugin,
} from '../../types/plugin';
import {
    Item,
} from '../../types/item';

import Icon from '../../components/common/icon';

export default class DefaultPlugin implements Plugin{
    canRenderItem(){
        return false;
    }
    renderIcon(){
        return <Icon name="file-o" />;
    }
    renderItem(item: Item){
        return <div>
            <p>ファイル<b>{item.name}</b>を描画できません。</p>
        </div>;
    }
}
