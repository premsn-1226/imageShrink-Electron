const { app, BrowserWindow, Menu, globalShortcut } = require('electron')
process.env.NODE_ENV = 'dev'
var isDev = process.env.NODE_ENV === 'prod' ? true : false
var isWin = process.platform === 'win32' ? true:false
console.log(process.platform)
var mainWindow;
var aboutWindow;

function createWindow () {
   mainWindow = new BrowserWindow({
    title:'ImageShrink',
    width: 700,
    height: 700,
    icon:`${__dirname}/src/assests/icons/Icon_256x256.png`,
    resizable: isWin,
    backgroundColor:'#a6d2f7'
  })
  //mainWindow.loadURL('https://dev.admin.myfayvit.com/')
  mainWindow.loadFile('index.html')
}
function createAboutWindow () {
  aboutWindow = new BrowserWindow({
   width: 1300,
   height: 1300,
   resizable: false,
   //backgroundColor:'lightgreen'
 })
 aboutWindow.loadURL('https://dev.admin.myfayvit.com/')
 //aboutWindow.loadFile('about.html')
 aboutWindow.removeMenu();
}
app.whenReady().then(() => {
  createWindow()
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)
  globalShortcut.register('Ctrl+R',()=>mainWindow.reload())
  globalShortcut.register('Ctrl+i',()=>mainWindow.toggleDevTools())
 })
const menu = [
  ...(isDev ? [
    {
      label:'File',
      submenu:[
        {
          label:'Quit',
          accelerator:'Ctrl+q',
          click: ()=>app.quit()
        },
        {
          label:'relaunch',
          accelerator:'Ctrl+l',
          click: ()=>app.relaunch()
        },
        {
          label:'about',
          click: ()=>app.showAboutPanel()
        },
        {
          label:'showEmoji',
          accelerator:'Ctrl+e',
          click: ()=>app.showEmojiPanel()
        },
      ]
    },
    {
      role:'editMenu'
    },{
      label:'help',
      submenu:[{
        label:'admin portal',
        accelerator:'Ctrl+f',
        click:createAboutWindow
      }]
    },{
    label:'developer',
    submenu:[
      {role:'reload'},
      {role:'forcereload'},
      {type:'separator'},
      {role:'toggledevtools'},
    ]
  }]:[
    {
      label:'File',
      submenu:[
        {
          label:'Quit',
          accelerator:'Ctrl+q',
          click: ()=>app.quit()
        },
        {
          label:'relaunch',
          accelerator:'Ctrl+l',
          click: ()=>app.relaunch()
        },
        {
          label:'about',
          accelerator:'Ctrl+f',
          click: createAboutWindow
        },
        {
          label:'showEmoji',
          click: ()=>app.showEmojiPanel()
        },
      ]
    }
  ])
]


//   app.on('activate', function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit()
// })

