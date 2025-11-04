
import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("bridge", {
  getStatus: () => ipcRenderer.invoke("status:get"),
  setStatus: (s: "inactive"|"active"|"error") => ipcRenderer.invoke("status:set", s),
  openExternal: (link: string) => ipcRenderer.send("openExternal", link),
});
