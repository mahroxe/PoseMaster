/**
 * PoseMaster – File Responsibility Checklist
 *
 * ☐ This file has a single responsibility
 * ☐ This file does NOT leak responsibilities from other layers
 * ☐ This file avoids circular dependencies
 * ☐ This file follows project architecture rules
 * ☐ Items below are struck-through when implemented
 */

/**
 * PoseMaster – src/store/cameraStore.ts
 * 
 * ☐ Camera position, rotation, FOV
 * ☐ List of saved named views
 * ☐ Grid/lock/auto-rotate toggles
 * ☐ Serializable
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface CameraState {
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  fov: number
  savedViews: Record<string, CameraState>
  gridVisible: boolean
  orbitLocked: boolean

  setPosition: (x: number, y: number, z: number) => void
  setRotation: (x: number, y: number, z: number) => void
  setFOV: (fov: number) => void
  toggleGrid: () => void
  toggleOrbitLock: () => void
  saveView: (name: string) => void
  loadView: (name: string) => void
}

export const useCameraStore = create<CameraState>()(
  immer((set, get) => ({
    position: { x: 0, y: 0, z: 5 },
    rotation: { x: 0, y: 0, z: 0 },
    fov: 75,
    savedViews: {},
    gridVisible: true,
    orbitLocked: false,

    setPosition: (x, y, z) =>
      set((state) => {
        state.position = { x, y, z }
      }),

    setRotation: (x, y, z) =>
      set((state) => {
        state.rotation = { x, y, z }
      }),

    setFOV: (fov) =>
      set((state) => {
        state.fov = fov
      }),

    toggleGrid: () =>
      set((state) => {
        state.gridVisible = !state.gridVisible
      }),

    toggleOrbitLock: () =>
      set((state) => {
        state.orbitLocked = !state.orbitLocked
      }),

    saveView: (name) => {
      const state = get()
      set((s) => {
        const viewState: CameraState = {
          position: state.position,
          rotation: state.rotation,
          fov: state.fov,
          savedViews: {},
          gridVisible: state.gridVisible,
          orbitLocked: state.orbitLocked,
          setPosition: state.setPosition,
          setRotation: state.setRotation,
          setFOV: state.setFOV,
          toggleGrid: state.toggleGrid,
          toggleOrbitLock: state.toggleOrbitLock,
          saveView: state.saveView,
          loadView: state.loadView,
        }
        s.savedViews[name] = viewState
      })
    },

    loadView: (name) => {
      const state = get()
      const view = state.savedViews[name]
      if (view) {
        set((s) => {
          s.position = view.position
          s.rotation = view.rotation
          s.fov = view.fov
        })
      }
    },
  }))
)
