import {
    extname,
} from 'path';
import * as React from 'react';
import styled from 'styled-components';
import * as imageSize from 'image-size';

import Icon from '../../components/common/icon';

import {
    Plugin,
    RenderItemOptions,
    RecognizeResult,
} from '../../types/plugin';
import {
    Item,
} from '../../types/item';

export const TYPE_IMAGE = 'image';

export interface ImageMetadata{
    width: number;
    height: number;
}

const FitImg = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    object-position: 50% 50%;
`;

const NonFitImg = styled.img`
    max-width: 100%;
    height: auto;
    object-fit: scale-down;
    object-position: 50% 50%;
`;

export default class RenderImagePlugin implements Plugin<ImageMetadata>{
    protected isImage(fullpath: string): boolean{
        const ext = extname(fullpath);
        if (/^\.(?:gif|png|jpe?g)$/.test(ext)){
            return true;
        }
        return false;
    }
    recognizeFile(fullpath: string){
        if (!this.isImage(fullpath)){
            return Promise.resolve(undefined);
        }
        // TODO
        return new Promise<RecognizeResult<ImageMetadata>>((resolve, reject)=>{
            imageSize(fullpath, (err, obj)=>{
                if (err != null){
                    reject(err);
                }else{
                    const {
                        width,
                        height,
                    } = obj;
                    resolve({
                        type: TYPE_IMAGE,
                        metadata: {
                            width,
                            height,
                        },
                    });
                }
            });
        });
    }
    canRenderItem({type}: Item): boolean{
        return type === TYPE_IMAGE;
    }
    renderIcon(){
        return <Icon name="file-image-o" />;
    }
    renderItem({fullpath, metadata}: Item, {fit, styles}: RenderItemOptions){
        const {
            width,
            height,
        }: ImageMetadata = metadata;
        const styles2 = styles || {};
        const styles3 = {
            ... styles2,
        };
        if (fit === true){
            return <FitImg src={fullpath} style={styles3}/>;
        }else{
            return <NonFitImg src={fullpath} style={styles3} width={width} height={height}/>;
        }
    }
}
