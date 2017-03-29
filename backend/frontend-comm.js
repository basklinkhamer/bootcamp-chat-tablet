import { BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import notifier from 'node-notifier';

let settingsObject = JSON.parse(
    fs.readFileSync(path.join(__dirname, './app-settings.json'), 'utf8')
);

ipcMain.on('getTitle', (event, args) => {
    event.returnValue = settingsObject.title;
});

ipcMain.on('getDefaults', (event, args) => {
    event.returnValue = settingsObject.defaults;
});

ipcMain.on('notify', (event, args) => {
    let focusedWindow = BrowserWindow.getFocusedWindow();
    if(focusedWindow===null){
        notifier.notify({
          title: `${args.username} in ${args.room}`,
          message: args.content,
          sound: true,
          icon: path.join(__dirname, settingsObject.icon),
        });
        event.returnValue = 'sent';
    } else {
        event.returnValue = 'not sent';
    }
});
