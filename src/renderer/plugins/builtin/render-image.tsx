import {
    extname,
} from 'path';
import * as React from 'react';
import styled from 'styled-components';

import Icon from '../../components/common/icon';

import {
    Plugin,
} from '../../types/plugin';
import {
    Item,
} from '../../types/item';

const ImgWrapper = styled.div`
    margin: 1em 0;

    text-align: center;
`;
const Img = styled.img`
    max-width: 100%;
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
    renderItem({fullpath}: Item){
        return <ImgWrapper>
            <Img src={fullpath} />
        </ImgWrapper>
    }
}
