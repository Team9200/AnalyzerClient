const {
  app,
  ipcMain
} = require('electron')
const window = require('./window');

app.on('ready', window.createMainWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    window.createMainWindow();
  }
})

ipcMain.on('menu', function (event, message) {
  switch (message) {
    case 'write':
      window.createReportWindow();
      break;
    default:
      break;
  }
});