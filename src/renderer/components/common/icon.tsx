import * as React from 'react';


export interface IPropIcon{
    name: string;
    size?: 'lg' | '2x' | '3x' | '4x' | '5x';
}

/**
 * Renders Font Awesome icon.
 */
const Icon = ({name, size}: IPropIcon)=>{
    let className = `fa fa-${name}`;
    if (size != null){
        className += ` fa-${size}`;
    }
    return <i className={`fa fa-${name}`} />;
};
export default Icon;
