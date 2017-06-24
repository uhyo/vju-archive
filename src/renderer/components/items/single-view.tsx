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
    position: relative;
    height: 100%;
`;

const DragWrapper = styled.div`
    height: 100%;
`;

const WrapSpan = styled.span`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: max-content;
    height: max-content;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
`;

export default class SingleView extends React.Component<IPropSingleView, {}>{
    render(){
        const {
            item,
            zoom,
        } = this.props;
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
                <WrapSpan>
                {plugins.renderItem(item, {
                    fit: true,
                    styles: imgStyle && {},
                })}
                </WrapSpan>
                </DraggableItem>
                </NonFitWrapper>;
        }else{
            return null;
        }
    }
}
