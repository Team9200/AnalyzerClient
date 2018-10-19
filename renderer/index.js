const {ipcRenderer} = require('electron');
var write = document.querySelector("#write");

$(document).ready(function () {
    var fileTarget = $('.filebox .upload-hidden');
    fileTarget.on('change', function () {
        if (window.FileReader) {
            var filename = $(this)[0].files[0].path;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        $(this).siblings('.upload-name').val(filename);
    });
});

write.addEventListener('click', function () {
    ipcRenderer.send('menu', 'write');
});