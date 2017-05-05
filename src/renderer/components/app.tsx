import * as React from 'react';

import TreeGroup from '../containers/tree-group';
import Images from '../components/images';

import '../css/root.css';

import * as styles from '../css/app.css';

export default class App extends React.Component<{}, {}>{
    render(){
        return <div className={styles.wrapper}>
            <div className={styles.treeGroup}>
                <TreeGroup/>
            </div>
            <div className={styles.images}>
                <Images/>
            </div>
        </div>;
    }
}
