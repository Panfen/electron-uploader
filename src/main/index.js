import uploader from './utils/uploader.js'
import {app, BrowserWindow, ipcMain} from 'electron'
import db from '../datastore'
import pasteTemplate from './utils/pasteTemplate'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.htmzxsl
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let settingWindow

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
const settingWinURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#landingpage/upload`
  : `file://${__dirname}/index.html#landingpage/upload`

ipcMain.on('uploadChoosedFiles', (evt, files) => {
  const imgs = uploader(files, 'imgFromUploader', settingWindow.webContents);
  if (imgs) {
    const pasteStyle = db.read().get('picBed.pasteStyle').value() || 'markdown';
    let pasteText = '';
    for (let i in imgs) {
      pasteText += pasteTemplate(pasteStyle, img[i].imgUrl) + '\r\n';
      const notification = new Notification({
        title: '上传成功！',
        body: imgs[i].imgUrl,
        icon: files[i].path
      });
      setTimeout(() => {
        notification.show();
      }, i * 100);
    }
    mainWindow.webContents.send('uploadFiles', imgs);
  } else {
    uploadFailed();
  }
});

function createWindow () {
  //Initial window options
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  createSettingWindow();
}

const createSettingWindow = () => {
  const options = {
    height: 450,
    width: 800,
    show: false,
    frame: true,
    center: true,
    fullscreenable: false
  }
  settingWindow = new BrowserWindow(options);

  settingWindow.loadURL(BrowserWindow);

  settingWindow.on('closed', () => {
    settingWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */