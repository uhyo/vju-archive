// logic

/**
 * Invoke addfile operation.
 */
export function addFile(win: Electron.BrowserWindow): void{
    const {
        webContents,
    } = win;
    webContents.send('command:add-file');
}
