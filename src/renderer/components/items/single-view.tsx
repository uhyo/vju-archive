import * as React from 'react';
import styled from 'styled-components';

import plugins from '../../plugins';
import {
    Item,
} from '../../types/item';
import {
    SingleZoomMode,
} from '../../types/view';

import {
    DraggableItem,
} from './draggable';

export interface IPropSingleView{
    /**
     * Item to show.
     */
    item: Item;
    /**
     * Current zoom of view.
     */
    zoom: SingleZoomMode;
}

const NonFitWrapper = styled.div`
    height: 100%;
`;

const DragWrapper = styled.div`
    position: relative;
    height: 100%;
`;

export default ({
    item,
    zoom,
}: IPropSingleView)=>{
    const {
        id,
    } = item;
    if (zoom.type === 'whole'){
        const imgStyle = {
            position: 'absolute',
            left: '0',
            top: '0',
            right: '0',
            bottom: '0',
            maxWidth: '100%',
            maxHeight: '100%',
            margin: 'auto',
        };
        return <NonFitWrapper>
            <DraggableItem tagName={DragWrapper} id={id}>
                {plugins.renderItem(item, {
                    fit: false,
                    styles: imgStyle,
                })}
            </DraggableItem>
        </NonFitWrapper>;
    }else{
        return null;
    }
};
