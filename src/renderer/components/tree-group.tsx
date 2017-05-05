import * as React from 'react';

import {
    GroupsState,
} from '../reducers/groups';
import {
    GroupTreeState,
} from '../reducers/tree-group';

import * as styles from '../css/tree-group.css';

export interface IPropTreeGroup{
    groups: GroupsState;
    treeGroup: GroupTreeState;
    /**
     * グループを選択
     */
    onSelect(id: string): void;
}
export default class TreeGroup extends React.Component<IPropTreeGroup, {}>{
    render(){
        const {
            groups,
            treeGroup: {
                root,
                current,
            },
            onSelect,
        } = this.props;

        if (root == null){
            return <div>Hey!</div>;
        }
        return <div className={styles.wrapper}>
            <GroupNode groups={groups} id={root} open={current} level={0} onSelect={onSelect} />
        </div>;
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
}
class GroupNode extends React.Component<IPropGroupNode, {}>{
    render(): JSX.Element{
        const {
            groups,
            id,
            open,
            level,
            onSelect,
        } = this.props ;
        const group = groups.groups[id];
        if (group == null){
            return <div>Hoy!</div>;
        }
        const {
            name,
            children,
        } = group;
        const cl = styles.name + (id === open ? ' ' + styles.open : '');
        const nameStyle = {
            paddingLeft: `calc(4px + ${level}em)`,
        };
        const handleClick = ()=>{
            onSelect(id);
        };
        return <div className={styles.group}>
            <div className={cl} style={nameStyle} onClick={handleClick}>{name}</div>
            <div className={styles.children}>{
                children.map(id=>{
                    return <GroupNode key={id} groups={groups} id={id} open={open} level={level+1} onSelect={onSelect} />;
                })
            }</div>
        </div>;
    }
};
