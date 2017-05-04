import {
    app,
    BrowserWindow,
} from 'electron';

import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow | null;

function createWindow(){
    mainWindow = new BrowserWindow();

    const u = url.format({
        pathname: path.resolve(__dirname, '..', '..', 'view', 'index.html'),
        protocol: 'file:',
        slashes: true,
    });
    mainWindow.loadURL(u);

    mainWindow.on('closed', ()=>{
        mainWindow = null;
    });
}


app.on('ready', createWindow);

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
