const { app, BrowserWindow, ipcMain, screen, webContents, dialog } = require("electron");
const path = require('path')
const electronReload = require('electron-reload')

function createWindow () {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: width,
    height: height,
    minWidth: width,
    minHeight: height,
    // alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadURL(`file://${__dirname}/dist/index.html`)
  //win.loadFile('dist/index.html')
  //win.loadURL(`http://153.92.210.7:81/`)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
