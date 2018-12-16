
const {Menu} = require('electron');
const electron = require('electron');

const template = [
    {
        label: 'file',
        submenu: [
            {
                label: 'fuckquit',
                accelerator: 'Esc',
                role: 'quit'
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn more',
                click(){require('electron').shell.openExternal('http://electron.atom.io')}
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);