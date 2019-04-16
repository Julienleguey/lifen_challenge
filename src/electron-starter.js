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
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // load the page from React
    mainWindow.loadURL('http://localhost:3000');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null;
    })

}

// method to try and communicate from Electron to React
function communicate() {
  const arg = "Hello, there!";
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send("ping", arg);
  });
}


app.on('ready', () => {
  createWindow();
  communicate();
});
