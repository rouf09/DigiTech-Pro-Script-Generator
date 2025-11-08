import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { existsSync } from "fs";

// ✅ Keep a global reference to window
let win: BrowserWindow | null = null;

async function createWindow() {
  const iconPath = path.join(__dirname, "../assets/icon.ico");
  if (!existsSync(iconPath)) console.warn("⚠️ Icon missing:", iconPath);

  win = new BrowserWindow({
    width: 1280,
    height: 760,
    minWidth: 1100,
    minHeight: 680,
    backgroundColor: "#0b1023",
    title: "DigiTech-Pro • Script Generator",
    icon: iconPath, // ✅ Custom icon
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const startURL =
    process.env.VITE_DEV_SERVER_URL ||
    `file://${path.join(__dirname, "../dist-renderer/index.html")}`;

  win.loadURL(startURL).catch((err) => console.error("Load failed:", err));
  win.on("closed", () => (win = null));
}

// ✅ App events
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
