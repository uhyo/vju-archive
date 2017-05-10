import {
    ipcRenderer,
} from 'electron';

import store from '../store';

import {
    openFileDialogAction,
} from '../actions/item';

export function initIpc(): void{
    ipcRenderer.on('command:add-file', ()=>{
        store.dispatch(openFileDialogAction());
    });
}
