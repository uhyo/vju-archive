import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    remote,
} from 'electron';
const {
    Menu,
    MenuItem,
} = remote;

import {
    initIpc,
} from './ipc';

import App from './containers/index';

const area = document.getElementById('app');

const app = <App />;

ReactDOM.render(app, area);

initIpc();

initMenu();

function initMenu(): void{
    let position: {x: number; y: number} | undefined = undefined;
    // context menuを作る
    const menu = new Menu();
    const item1 = new MenuItem({
        label: 'Inspect',
        click(){
            if (position != null){
                remote.getCurrentWindow().webContents.inspectElement(position.x, position.y);
            }
        },
    });
    menu.append(item1);

    window.addEventListener('contextmenu', e=>{
        e.preventDefault();
        position = e;
        menu.popup(remote.getCurrentWindow());
    });

}
