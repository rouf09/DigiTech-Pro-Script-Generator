
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
    },
  });

  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    await win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    const indexHtml = url.pathToFileURL(path.join(__dirname, "../renderer/index.html")).toString();
    await win.loadURL(indexHtml);
  }
  win.on("closed", () => (win = null));
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });

let apiStatus: "inactive" | "active" | "error" = "inactive";
ipcMain.handle("status:get", async () => ({ status: apiStatus }));
ipcMain.handle("status:set", async (_e, s: "inactive"|"active"|"error") => { apiStatus = s; return { ok: true }; });
ipcMain.on("openExternal", (_e, link: string) => shell.openExternal(link));
