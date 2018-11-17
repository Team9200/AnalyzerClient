const { app, ipcMain } = require('electron')
const window = require('./window');
const fs = require('fs');

let receivedData = new Array();
let resultData;

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

ipcMain.on('write', () => {
  window.createReportWindow();
});

ipcMain.on('requestFile', () => {
  window.createReqWindow();
});

ipcMain.on('receiveFile', (event, message) => {
	receivedData = receivedData.concat(message.binary.data);

	if(receivedData.length == message.size) {
		console.log("test", receivedData);
		resultData = new Buffer.from(receivedData);
		fs.writeFileSync('./samples/sample' + new Date().getTime() + '.zip', resultData);
		event.sender.send('receivedFile-reply', 'test');
		console.log('test!');	
	}
});