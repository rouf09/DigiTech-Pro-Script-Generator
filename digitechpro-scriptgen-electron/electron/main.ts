import { app, BrowserWindow, ipcMain, shell } from "electron";
import * as path from "path";
import * as url from "url";

const isDev = !!process.env.VITE_DEV_SERVER_URL;
let win: BrowserWindow | null = null;

async function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 760,
    minWidth: 1100,
    minHeight: 680,
    title: "DigiTech-Pro • Script Generator",
    backgroundColor: "#0b1023",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    await win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools({ mode: "detach" }); // চাইলে মুছে দাও
  } else {
    // 🔧 PRODUCTION: dist/index.html লোড করো
    await win.loadFile(path.join(__dirname, "../dist-renderer/index.html"));
  }
if (isDev) win.webContents.openDevTools({ mode: "detach" });
  win.on("closed", () => {
    win = null;
  });
}

// ---- App lifecycle ----
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// (ঐচ্ছিক) IPC / shell / অন্য হ্যান্ডলার এখানে রাখো
