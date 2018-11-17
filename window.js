const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const url = require('url');
const path = require('path');

let mainWindow;
let reportWindow;
let reqWindow;

module.exports = {
    createMainWindow: () => {
        mainWindow = new BrowserWindow({
            width: 600,
            height: 400,
            resizable: false
        });
        mainWindow.setMenu(null);

        mainWindow.loadFile('./app/src/index.html')

        mainWindow.webContents.openDevTools();

        mainWindow.webContents.on('did-finish-load', () => {
            var fileList;

            fileList = fs.readdirSync('./samples');
            console.log(fileList);
            mainWindow.webContents.send("fileList", fileList);
        });

        mainWindow.on('closed', function () {
            mainWindow = null;
        });
    },
    createReportWindow: () => {
        reportWindow = new BrowserWindow({
            parent: mainWindow,
            width: 250,
            height: 300,
            resizable: false
        });
        reportWindow.setMenu(null);
        
        reportWindow.loadFile('./app/src/reportForm.html')
        reportWindow.on('closed', function () {
            reportWindow = null;
        });
    },

    createReqWindow: () => {
        reqWindow = new BrowserWindow({
            parent: mainWindow,
            width: 0,
            height: 0,
            resizable: false
        });
        reqWindow.setMenu(null);

        reqWindow.loadFile('./app/src/req.html');

        reqWindow.on('closed', function () {
            reqWindow = null;
        });
    }
}