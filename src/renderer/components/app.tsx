import * as React from 'react';

import TreeGroup from '../containers/tree-group';
import Items from '../containers/items';
import ItemData from '../containers/item-data';
import OptionsPanel from '../containers/options-panel';

import '../css/root.css';

import * as styles from '../css/app.css';

export default class App extends React.Component<{}, {}>{
    render(){
        return <div className={styles.wrapper}>
            <div className={styles.sideBar}>
                <div className={styles.treeGroup}>
                    <TreeGroup/>
                </div>
                <div className={styles.itemDataPanel}>
                    <ItemData/>
                </div>
                <div className={styles.optionsPanel}>
                    <OptionsPanel/>
                </div>
            </div>
            <div className={styles.images}>
                <Items/>
            </div>
        </div>;
    }
}
