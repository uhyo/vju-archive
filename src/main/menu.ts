import {
    Menu,
    MenuItem,
} from 'electron';

import {
    addFile,
} from './logic';

export function setMenu(): void{
    const menu = Menu.getApplicationMenu();
    if (menu == null){
        return;
    }
    // new menu!
    const addFileMenu = new MenuItem({
        click(_, win){
            addFile(win);
        },
        label: 'Add File',
    });
    (menu.items[0].submenu as any).append(addFileMenu);
}
