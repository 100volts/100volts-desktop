
const { app, BrowserWindow } = require("electron");
const path = require("node:path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1800,
    height: 1000,
    webPreferences: {
      //preload: path.join(__dirname, "preload.js"),
      contextIsolation: false,
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'assets', 'logo/logo_v1.png')
  });
  mainWindow.loadFile("index.html");
  mainWindow.webContents.openDevTools();
}


app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
