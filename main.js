
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// const Mousetrap = require('mousetrap');

// const {app, BrowserWindow} = require('electron');

let win;

function createWindow(){
    win = new BrowserWindow();
    win.setFullScreen(true);

    // Mousetrap.bind('esc', function(){win.quit();}, 'keydown');
    // win.maximize();
    win.loadFile('main.html');

    win.on('closed', () => {
        win = null;
    });

    require('./electronMenu/mainmenu.js');
    win.setMenuBarVisibility(false);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
})

app.on('activate', () => {
    if(win === null){
        createWindow();
    }
})