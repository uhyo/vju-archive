import {
    app,
    BrowserWindow,
} from 'electron';

import {
    setMenu,
} from './menu';

import * as path from 'path';
import * as url from 'url';

// load theme for background
let mainWindow: Electron.BrowserWindow | null;

function createWindow(){
    mainWindow = new BrowserWindow({
        // VERY AD-HOC
        backgroundColor: 'hsl(217, 26%, 35%)',
        show: false,
    });

    const u = url.format({
        pathname: path.resolve(__dirname, '..', '..', 'view', 'index.html'),
        protocol: 'file:',
        slashes: true,
    });
    mainWindow.loadURL(u);

    mainWindow.on('closed', ()=>{
        mainWindow = null;
    });
    const m = mainWindow;
    mainWindow.once('ready-to-show', ()=>{
        m.show();
    });
}


app.on('ready', ()=>{
    setMenu();
    createWindow();
});

app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin'){
        app.quit();
    }
});
app.on('activate', ()=>{
    if (mainWindow == null){
        createWindow();
    }
});
