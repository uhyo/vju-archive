import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    initIpc,
} from './ipc';

import App from './containers/index';

const area = document.getElementById('app');

const app = <App />;

ReactDOM.render(app, area);

initIpc();
