

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
// const {app, BrowserWindow} = require('electron');

let win;

function createWindow(){
    win = new BrowserWindow();
    win.setFullScreen(true);
    // win.maximize();
    win.setMenu(null);
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