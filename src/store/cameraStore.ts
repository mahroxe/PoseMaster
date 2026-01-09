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
 * ✓ Camera position, target, FOV
 * ✓ List of saved named views (snapshots)
 * ✓ Grid/lock toggles
 * ✓ Fully serializable
 * ✓ No Three.js objects
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface CameraSnapshot {
  position: { x: number; y: number; z: number }
  target: { x: number; y: number; z: number }
  fov: number
  timestamp: number
  name: string
}

export interface CameraState {
  position: { x: number; y: number; z: number }
  target: { x: number; y: number; z: number }
  fov: number
  snapshots: Record<string, CameraSnapshot>
  gridVisible: boolean
  orbitLocked: boolean

  setPosition: (x: number, y: number, z: number) => void
  setTarget: (x: number, y: number, z: number) => void
  setFOV: (fov: number) => void
  toggleGrid: () => void
  toggleOrbitLock: () => void
  saveSnapshot: (name: string) => void
  loadSnapshot: (name: string) => void
  deleteSnapshot: (name: string) => void
  listSnapshots: () => string[]
  reset: () => void
  serialize: () => string
  deserialize: (json: string) => void
}

export const useCameraStore = create<CameraState>()(
  immer((set, get) => ({
    position: { x: 0, y: 0, z: 5 },
    target: { x: 0, y: 0, z: 0 },
    fov: 75,
    snapshots: {},
    gridVisible: true,
    orbitLocked: false,

    setPosition: (x, y, z) =>
      set((state) => {
        state.position = { x, y, z }
      }),

    setTarget: (x, y, z) =>
      set((state) => {
        state.target = { x, y, z }
      }),

    setFOV: (fov) =>
      set((state) => {
        const clamped = Math.max(1, Math.min(179, fov))
        state.fov = clamped
      }),

    toggleGrid: () =>
      set((state) => {
        state.gridVisible = !state.gridVisible
      }),

    toggleOrbitLock: () =>
      set((state) => {
        state.orbitLocked = !state.orbitLocked
      }),

    saveSnapshot: (name: string) => {
      const state = get()
      set((s) => {
        s.snapshots[name] = {
          position: { ...state.position },
          target: { ...state.target },
          fov: state.fov,
          timestamp: Date.now(),
          name,
        }
      })
    },

    loadSnapshot: (name: string) => {
      const snapshot = get().snapshots[name]
      if (snapshot) {
        set((s) => {
          s.position = { ...snapshot.position }
          s.target = { ...snapshot.target }
          s.fov = snapshot.fov
        })
      }
    },

    deleteSnapshot: (name: string) =>
      set((state) => {
        delete state.snapshots[name]
      }),

    listSnapshots: () => Object.keys(get().snapshots),

    reset: () =>
      set((state) => {
        state.position = { x: 0, y: 0, z: 5 }
        state.target = { x: 0, y: 0, z: 0 }
        state.fov = 75
        state.gridVisible = true
        state.orbitLocked = false
      }),

    serialize: () => {
      const state = get()
      return JSON.stringify({
        position: state.position,
        target: state.target,
        fov: state.fov,
        snapshots: state.snapshots,
        gridVisible: state.gridVisible,
        orbitLocked: state.orbitLocked,
      })
    },

    deserialize: (json: string) => {
      try {
        const parsed = JSON.parse(json)
        set((state) => {
          state.position = parsed.position || { x: 0, y: 0, z: 5 }
          state.target = parsed.target || { x: 0, y: 0, z: 0 }
          state.fov = parsed.fov || 75
          state.snapshots = parsed.snapshots || {}
          state.gridVisible = parsed.gridVisible !== false
          state.orbitLocked = parsed.orbitLocked || false
        })
      } catch (e) {
        console.error('Failed to deserialize camera state:', e)
      }
    },
  }))
)
