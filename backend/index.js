import { app, BrowserWindow} from 'electron';
import url from 'url';
import path from 'path';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const startApp = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        // Set the window title
        title: 'Digital Bootcamp - Electron Chat App',
        // Set window dimensions
        width: 800,
        height: 600,
        // Set initial location on user screen
        x: 100,
        y: 100,
        // Can a user change dimensions of the window?
        resizable: true,
        minimizable: true,
        maximizable: true,
        // Will the app start in fullscreen mode?
        fullscreen: false,
        // Remove all inappropriate window chrome?
        autoHideMenuBar: false,
        hasShadow: true,
        transparent: false,
        frame: true,
        // Settings for the 'chromium' part of our window
        webPreferences: {
            devTools: true,
            textAreasAreResizable: false
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        // Use index.html
        pathname: path.join(__dirname, '../frontend/index.html'),
        // Open it locally
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools when the project starts
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', startApp);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        startApp();
    }
});
