const { app, BrowserWindow, dialog, ipcMain, Menu } = require('electron');
const Store = require('electron-store');
import menuTemplate from './main/menu.js';
import 'regenerator-runtime/runtime'
import Engine from './main/engine.js';
const engine = new Engine('bridgeAndtunnel@0.1.0');
const store = new Store();
// const usbDetect = require('usb-detection');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // frame: false,
    // titleBarStyle: 'hidden',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
  engine.setMainWindow(mainWindow);
  mainWindow.engine = engine;
};


app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


const checkUSB = () => {
  usbDetect.startMonitoring();
  usbDetect.on('add', function (device) { console.log('add', device); });
  usbDetect.on('remove', function (device) { console.log('remove', device); });
// Allow the process to exit
//usbDetect.stopMonitoring()
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

app.whenReady().then(() => {
  // createWindow();
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  ipcMain.on('rete:sendNodesToMain', (event, nodes) => {
    // this used to be an async function, does it need to be
    engine.storeNodes(nodes);
  });

  ipcMain.on('rete:engineProcessJSON', (event, json) => {
    engine.processJSON(json);
  })

  ipcMain.on('store-session', (event, session) => {
    store.set('session', session);
  });

  mainWindow.webContents.session.on('serial-port-added', (event, port) => {
    console.log('serial-port-added FIRED WITH', port)
    //Optionally update portList to add the new port
  })

  mainWindow.webContents.session.on('serial-port-removed', (event, port) => {
    console.log('serial-port-removed FIRED WITH', port)
    //Optionally update portList to remove the port
  })

});
