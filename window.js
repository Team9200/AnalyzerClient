const {
    app,
    BrowserWindow
} = require('electron');

let mainWindow;
let reportWindow;

module.exports = {
    createMainWindow: () => {
        mainWindow = new BrowserWindow({
            width: 400,
            height: 500,
            resizable: false
        });
        mainWindow.setMenu(null);
        
        mainWindow.loadFile('./app/src/index.html')
        mainWindow.on('closed', function () {
            mainWindow = null;
        });
    },
    createReportWindow: () => {
        reportWindow = new BrowserWindow({
            parent: mainWindow,
            width: 400,
            height: 500,
            resizable: false
        });
        reportWindow.setMenu(null);
        
        reportWindow.loadFile('./app/src/reportForm.html')
        reportWindow.on('closed', function () {
            reportWindow = null;
        });
    }
}