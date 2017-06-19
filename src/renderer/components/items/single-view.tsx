import * as React from 'react';
import styled from 'styled-components';

import plugins from '../../plugins';
import {
    Item,
} from '../../types/item';

import {
    DraggableItem,
} from './draggable';

export interface IPropSingleView{
    /**
     * Item to show.
     */
    item: Item;
}

const NonFitWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
`;

export default ({
    item,
}: IPropSingleView)=>{
    const {
        id,
    } = item;
    const attributes = {
        style: {
            height: '100%',
            fontSize: '0',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center' as 'center',
        },
    };
    return <DraggableItem tagName="div" id={id} attributes={attributes}>
        <NonFitWrapper>{plugins.renderItem(item, {fit: false})}</NonFitWrapper>
    </DraggableItem>;
};
