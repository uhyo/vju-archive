import * as React from 'react';

export interface IPropDraggableItem{
    tagName: keyof JSX.IntrinsicElements;
    attributes?: React.HTMLAttributes<HTMLElement>;
    id: string;
    group?: string;
}
export class DraggableItem extends React.Component<IPropDraggableItem, {}>{
    render(){
        const {
            id,
            group,
            tagName,
            attributes,
            children,
        } = this.props;

        const handleDragStart = (e: React.DragEvent<any>)=>{
            e.dataTransfer.setData('text/plain', id);
            e.dataTransfer.setData('text/x-item-id', id);
            if (group != null){
                e.dataTransfer.setData('text/x-group-id', group);
            }
            e.dataTransfer.effectAllowed = 'copyMove';
        };

        return React.createElement(tagName, {
            ... (attributes || {}),
            draggable: true,
            onDragStart: handleDragStart,
        }, children);
    }
}

export interface IPropItemDropArea{
    onDragStateChange?(hover: boolean): void;
    onDrop(id: string, effect: 'copy' | 'move', groupId: string | undefined): void;
}
export const ItemDropArea = ({
    onDragStateChange,
    onDrop,
    children,
}: IPropItemDropArea & {children?: any})=>{
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault();
        if (onDragStateChange != null){
            onDragStateChange(true);
        }
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>)=>{
        if (e.ctrlKey){
            e.dataTransfer.dropEffect = 'copy';
        }else{
            e.dataTransfer.dropEffect = 'move';
        }
        e.preventDefault();
    };
    const handleDragLeave = ()=>{
        if (onDragStateChange != null){
            onDragStateChange(false);
        }
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>)=>{
        const id = e.dataTransfer.getData('text/x-item-id');
        const groupid = e.dataTransfer.getData('text/x-group-id');
        if (id != null){
            const effect = e.ctrlKey ? 'copy' : 'move';
            onDrop(id, effect, groupid || void 0);
        }
        if (onDragStateChange != null){
            onDragStateChange(false);
        }
    };
    return <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        >{
        children
    }</div>;
};
