import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    // Expose Electron APIs to renderer (ipcRenderer, webFrame, etc.)
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    console.log('Electron APIs exposed to renderer')
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
  console.log('Electron API bez izolace')
}
