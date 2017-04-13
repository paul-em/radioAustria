 // Handling squirrel setupevents before the process starts.
 const setupEvents = require('./build_tools/setupEvents')
 if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
 }

const {app, BrowserWindow, ipcMain, shell} = require('electron');
const url = require('url');

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
  try {require('./app/scripts/mpris').init(app, mainWindow);} catch (err) {}
  try {require('electron-connect').client.create(mainWindow);} catch (err) {}
  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', function (e, uri) {
    let protocol = url.parse(uri).protocol;

    if (protocol === 'http:' || protocol === 'https:') {
      e.preventDefault();
      shell.openExternal(uri);
    }
  })

  ipcMain.on('foreground', (e, arg) => {
    mainWindow.setAlwaysOnTop(arg);
    e.returnValue = arg;
  });

  ipcMain.on('stationChange', (e, arg) => {
    mainWindow.setIcon(__dirname + '/dist/images/logos/' + arg + '-64.png');
    e.returnValue = arg;
  });
});
