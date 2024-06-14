
const { app, BrowserWindow } = require("electron");
const path = require("node:path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
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

const express= require("express");

const appE=express();

appE.get("/*",(req,res)=>{
    res.sendFile(path.resolve("index.html"))
})

appE.get("/elmeters",(req,res)=>{
  res.sendFile(path.resolve("component/electric-meter","electric-meter.html"))
})

appE.listen(process.env.PORT || 8081 ,()=> console.log("server running"))