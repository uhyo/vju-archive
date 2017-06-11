import {
    extname,
} from 'path';
import * as React from 'react';

import {
    Plugin,
} from '../../types/plugin';
import {
    Item,
} from '../../types/item';

export default class RenderImagePlugin implements Plugin{
    canRenderItem({fullpath}: Item): boolean{
        const ext = extname(fullpath);
        if (/^\.(?:gif|png|jpe?g)$/.test(ext)){
            return true;
        }
        return false;
    }
    renderItem({fullpath}: Item){
        return <div>
            <img src={fullpath} />
        </div>
    }
}
