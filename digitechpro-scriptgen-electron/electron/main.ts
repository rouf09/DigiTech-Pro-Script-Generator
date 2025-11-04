// digitechpro-scriptgen-electron/electron/main.ts
import { app, BrowserWindow } from "electron";
import * as path from "path";
import { pathToFileURL } from "url";

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
      nodeIntegration: false
    }
  });

  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    await win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    const indexPath = path.join(__dirname, "..", "dist-renderer", "index.html");
    const fileUrl = pathToFileURL(indexPath).toString();   // ✅ safe file:// URL
    await win.loadURL(fileUrl);
  }

  // ডিবাগে সাহায্য করবে
  win.webContents.on("did-fail-load", (_e, code, desc, url) => {
    console.error("did-fail-load", code, desc, url);
  });
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
