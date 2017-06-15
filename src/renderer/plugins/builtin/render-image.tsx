import {
    extname,
} from 'path';
import * as React from 'react';
import styled from 'styled-components';

import Icon from '../../components/common/icon';

import {
    Plugin,
    RenderItemOptions,
} from '../../types/plugin';
import {
    Item,
} from '../../types/item';

const FitImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: 50% 50%;
`;

const NonFitImg = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    object-position: 50% 50%;
`;

export default class RenderImagePlugin implements Plugin{
    canRenderItem({fullpath}: Item): boolean{
        const ext = extname(fullpath);
        if (/^\.(?:gif|png|jpe?g)$/.test(ext)){
            return true;
        }
        return false;
    }
    renderIcon(){
        return <Icon name="file-image-o" />;
    }
    renderItem({fullpath}: Item, {fit}: RenderItemOptions){
        if (fit === true){
            return <FitImg src={fullpath} />;
        }else{
            return <NonFitImg src={fullpath} />;
        }
    }
}
