import * as React from 'react';
import {
    findDOMNode,
} from 'react-dom';
import styled from 'styled-components';

import plugins from '../../plugins';
import {
    Item,
} from '../../types/item';
import {
    View,
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
    /**
     * Callback to change View.
     */
    onChangeView(view: View): void;
}

const ViewWrapper = styled.div`
    position: relative;
    height: 100%;
    overflow: hidden;
`;

const DragWrapper = styled.span`
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

const DragWrapper2 = styled.span`
    position: absolute;
`;

export default class SingleView extends React.Component<IPropSingleView, {}>{
    constructor(props: IPropSingleView){
        super(props);

        this.handleDoubleClick = this.handleDoubleClick.bind(this);
    }
    render(){
        const {
            item,
            zoom,
        } = this.props;
        const {
            id,
        } = item;

        if (zoom.type === 'whole'){
            return <ViewWrapper onDoubleClick={this.handleDoubleClick}>
                <DraggableItem tagName={DragWrapper} id={id} ref="item">
                {plugins.renderItem(item, {
                    fit: true,
                })}
                </DraggableItem>
            </ViewWrapper>;
        }else{
            const wrapStyle = {
                width: `${zoom.width}px`,
                height: `${zoom.height}px`,
                left: `calc(50% - ${zoom.width/2}px)`,
                top: `calc(50% - ${zoom.height/2}px)`,
            };
            const wrapAttributes = {
                style: wrapStyle,
            };
            return <ViewWrapper>
                <DraggableItem tagName={DragWrapper2} id={id} ref="item" attributes={wrapAttributes}>
                    {plugins.renderItem(item, {
                        fit: true,
                    })}
                </DraggableItem>
            </ViewWrapper>;
        }
    }
    protected handleDoubleClick(){
        const {
            item,
            onChangeView,
        } = this.props;

        console.log('DONG!');

        const i = this.refs.item as DraggableItem;
        const imgarea = findDOMNode(i) as HTMLElement;

        // 現在の画面表示の大きさを取得
        const {
            offsetWidth,
            offsetHeight,
        } = imgarea;

        // 本来の大きさ
        const {
            width,
            height,
        } = plugins.getSize(item);

        if (width === 0 || height === 0){
            return;
        }
        if (offsetWidth < width || offsetHeight < height){
            // 表示が実際のサイズより小さいので実際のサイズまで拡大
            onChangeView({
                type: 'single-view',
                zoom: {
                    type: 'zoom',
                    width,
                    height,
                },
            });
        }
    }
}
