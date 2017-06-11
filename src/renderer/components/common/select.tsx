import * as React from 'react';

import * as styles from '../../css/common/select.css';

export type Values<V> = Array<{
    value: V;
    label: string;
}>;

export interface IPropSelect<V>{
    values: Values<V>;
    currentValue: V;
    onChange(val: V): void;
}
export default class Select<V = string> extends React.Component<IPropSelect<V>, {}>{
    render(){
        const {
            values,
            currentValue,
            onChange,
        } = this.props;

        return <div className={styles.wrapper}>{
            values.map(({value, label})=>{
                const handleClick = ()=> onChange(value);
                let className = styles.value;
                if (value === currentValue){
                    className += ` ${styles.selected}`;
                }
                return <div key={String(value)} onClick={handleClick} className={className}>{
                    label
                }</div>;
            })
        }</div>;
    }
}
