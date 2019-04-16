const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const fs = require('fs');
var chokidar = require('chokidar');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({show: false});
    mainWindow.maximize();
    mainWindow.show();

    // load the page from React
    mainWindow.loadURL('http://localhost:3000');

    // // Open the DevTools. (for development)
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null;
    })
}

// method to try and communicate from Electron to React
function uploadNewFile() {

  // declaring the folder to watch
  const folder = `${app.getPath('documents')}/FHIR`;

  // initialize watcher
  var watcher = chokidar.watch(folder, {
    ignoreInitial: true,
    persistent: true
  });

  // watching if a file is added to the folder
  watcher.on('add', file => {

    // reading the file
    fs.readFile(file, function (err, data) {
      const fileName = path.basename(file);
      const fileType = path.extname(file);
      const fileSize = fs.statSync(file).size;
      if (err) throw err;

      // sending the file and the information for the controls to React
      mainWindow.webContents.send('upload', fileName, fileType, fileSize, data);
    });

  });
}


app.on('ready', () => {
  createWindow();
  uploadNewFile();
});
