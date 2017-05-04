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
}
export default class TreeGroup extends React.Component<IPropTreeGroup, {}>{
    render(){
        const {
            groups,
            treeGroup: {
                parent,
                current,
            },
        } = this.props;

        if (parent == null){
            return <div>Hey!</div>;
        }
        return <div>
            <GroupNode groups={groups} id={parent} open={current} />
        </div>;
    }
}

interface IPropGroupNode{
    groups: GroupsState;
    id: string;
    open: string | null;
}
class GroupNode extends React.Component<IPropGroupNode, {}>{
    render(): JSX.Element{
        const {
            groups,
            id,
            open,
        } = this.props ;
        const group = groups.groups[id];
        if (group == null){
            return <div>Hoy!</div>;
        }
        const {
            name,
            children,
        } = group;
        return <div className={styles.wrapper}>
            <div>{name}</div>
            <div className={styles.children}>{
                children.map(id=>{
                    return <GroupNode groups={groups} id={id} open={open} />;
                })
            }</div>
        </div>;
    }
};
