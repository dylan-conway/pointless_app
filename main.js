
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const remote = electron.remote;
const Menu = electron.Menu;
const menu = new Menu();
const Mousetrap = require('mousetrap');

// const {app, BrowserWindow} = require('electron');

let win;

function createWindow(){
    win = new BrowserWindow();
    win.setFullScreen(true);

    Mousetrap.bind('esc', function(){win.quit();}, 'keydown');
    // win.maximize();
    // win.setMenu(null);
    win.loadFile('index.html');

    win.on('closed', () => {
        win = null;
    });
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