// async requires polyfill
import '@babel/polyfill';
import {app, BrowserWindow, globalShortcut} from 'electron';
import path from 'path';
import url from 'url';

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload)),
  ).catch(console.log);
};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 540,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
    center: true,
    resizable: false,
    fullscreenable: false,
  });

  // Load html file into window.
  mainWindow.loadURL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:1212/dist'
      : `file://${__dirname}/build.html`,
  );

  // Open dev tools as soon as application is running in dev mode.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => (mainWindow = null));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development') {
    await installExtensions();
  }

  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Background music can start without user-interaction first.
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
