import * as React from 'react';

import {
    GroupsState,
} from '../reducers/groups';
import {
    GroupTreeState,
} from '../reducers/tree-group';


import {
    ItemDropArea,
} from './items/draggable';

import * as styles from '../css/tree-group.css';

export interface IPropTreeGroup{
    groups: GroupsState;
    treeGroup: GroupTreeState;
    /**
     * グループを選択
     */
    onSelect(id: string): void;
    /**
     * Itemがdropされたイベント
     */
    onItemDrop(id: string, action: 'move' | 'copy', oldGroup: string | undefined, newGroup: string): void;
}
export default class TreeGroup extends React.Component<IPropTreeGroup, {}>{
    render(){
        const {
            groups,
            treeGroup: {
                roots,
                current,
            },
            onSelect,
            onItemDrop,
        } = this.props;

        return <div className={styles.wrapper}>{
            roots.map(root=>
                <GroupNode key={root} groups={groups} id={root} open={current} level={0} onSelect={onSelect} onItemDrop={onItemDrop} />)
        }</div>;
    }
}

interface IPropGroupNode{
    /**
     * 全てのグループ
     */
    groups: GroupsState;
    /**
     * このグループが位置する階層
     */
    level: number;
    /**
     * 表示すべきグループのID
     */
    id: string;
    /**
     * このグループがopenされているか
     */
    open: string | null;
    /**
     * グループが選択されたイベント
     */
    onSelect(id: string): void;
    /**
     * Itemがdropされたイベント
     */
    onItemDrop(id: string, action: 'move' | 'copy', oldGroup: string | undefined, newGroup: string): void;
}
interface IStateGroupNode{
    hover: boolean;
}
class GroupNode extends React.Component<IPropGroupNode, IStateGroupNode>{
    constructor(props: IPropGroupNode){
        super(props);
        this.state = {
            hover: false,
        };
    }
    render(): JSX.Element{
        const {
            groups,
            id,
            open,
            level,
            onSelect,
            onItemDrop,
        } = this.props;
        const {
            hover,
        } = this.state;
        const group = groups.groups[id];
        if (group == null){
            return <div>Hoy!</div>;
        }
        const {
            name,
            children,
        } = group;
        const cl = styles.name + (id === open ? ' ' + styles.open : '') + (hover ? ' ' + styles.hover : '');
        const nameStyle = {
            paddingLeft: `calc(4px + ${level}em)`,
        };
        const handleClick = ()=>{
            onSelect(id);
        };
        const handleDragStateChange = (hover: boolean)=>{
            this.setState({
                hover,
            });
        };
        const handleDrop = (itemid: string, effect: 'copy' | 'move', group: string | undefined)=>{
            onItemDrop(itemid, effect, group, id);
        };

        return <div>
            <ItemDropArea
                onDragStateChange={handleDragStateChange}
                onDrop={handleDrop}>
                <div className={cl} style={nameStyle} onClick={handleClick}>
                    {name}
                </div>
            </ItemDropArea>
            <div>{
                children.map(id=>{
                    return <GroupNode key={id} groups={groups} id={id} open={open} level={level+1} onSelect={onSelect} onItemDrop={onItemDrop} />;
                })
            }</div>
        </div>;
    }
};
