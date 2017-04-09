const {app, BrowserWindow, ipcMain} = require('electron')
const {client} = require('electron-connect');

let mainWindow;

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1000, height: 800});

  mainWindow.loadURL('file://' + __dirname + '/dist/index.html');
  mainWindow.webContents.openDevTools();
  client.create(mainWindow);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  ipcMain.on('foreground', (e, arg) => {
    mainWindow.setAlwaysOnTop(arg);
    e.returnValue = arg;
  });

  ipcMain.on('stationChange', (e, arg) => {
    mainWindow.setIcon(__dirname + '/dist/images/logos/' + arg + '-16.png');
    e.returnValue = arg;
  });
});
