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
 * PoseMaster – src/store/poseStore.ts
 * 
 * ✓ Stores bone rotations (Euler degrees)
 * ✓ Tracks active model ID
 * ✓ Undo/redo history (Immer + snapshots with timestamps)
 * ✓ Serializable to JSON (excludes functions)
 * ✓ No Three.js objects
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface BoneRotation {
  x: number
  y: number
  z: number
}

export interface HistoryEntry {
  bones: Record<string, BoneRotation>
  timestamp: number
  description?: string
}

export interface PoseState {
  modelId: string | null
  bones: Record<string, BoneRotation>
  history: HistoryEntry[]
  historyIndex: number

  setBoneRotation: (boneName: string, rotation: BoneRotation) => void
  setBoneRotations: (bones: Record<string, BoneRotation>) => void
  resetPose: () => void
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
  loadPose: (pose: Record<string, BoneRotation>, description?: string) => void
  setModelId: (id: string | null) => void
  clearHistory: () => void
  serialize: () => string
  deserialize: (json: string) => void
}

export const usePoseStore = create<PoseState>()(
  immer((set, get) => ({
    modelId: null,
    bones: {},
    history: [{ bones: {}, timestamp: Date.now() }],
    historyIndex: 0,

    setBoneRotation: (boneName, rotation) =>
      set((state) => {
        state.bones[boneName] = rotation
        // Push to history after changes
        state.history.splice(state.historyIndex + 1)
        state.history.push({
          bones: JSON.parse(JSON.stringify(state.bones)),
          timestamp: Date.now(),
        })
        state.historyIndex = state.history.length - 1
      }),

    setBoneRotations: (bones) =>
      set((state) => {
        state.bones = JSON.parse(JSON.stringify(bones))
        state.history.splice(state.historyIndex + 1)
        state.history.push({
          bones: JSON.parse(JSON.stringify(state.bones)),
          timestamp: Date.now(),
        })
        state.historyIndex = state.history.length - 1
      }),

    resetPose: () =>
      set((state) => {
        state.bones = {}
        state.history.splice(state.historyIndex + 1)
        state.history.push({
          bones: {},
          timestamp: Date.now(),
          description: 'Reset pose',
        })
        state.historyIndex = state.history.length - 1
      }),

    undo: () => {
      const state = get()
      if (state.historyIndex > 0) {
        set((s) => {
          s.historyIndex--
          s.bones = JSON.parse(JSON.stringify(s.history[s.historyIndex].bones))
        })
      }
    },

    redo: () => {
      const state = get()
      if (state.historyIndex < state.history.length - 1) {
        set((s) => {
          s.historyIndex++
          s.bones = JSON.parse(JSON.stringify(s.history[s.historyIndex].bones))
        })
      }
    },

    canUndo: () => get().historyIndex > 0,

    canRedo: () => get().historyIndex < get().history.length - 1,

    loadPose: (pose, description) =>
      set((state) => {
        state.bones = JSON.parse(JSON.stringify(pose))
        state.history.splice(state.historyIndex + 1)
        state.history.push({
          bones: JSON.parse(JSON.stringify(state.bones)),
          timestamp: Date.now(),
          description,
        })
        state.historyIndex = state.history.length - 1
      }),

    setModelId: (id) =>
      set((state) => {
        state.modelId = id
      }),

    clearHistory: () =>
      set((state) => {
        state.history = [
          { bones: JSON.parse(JSON.stringify(state.bones)), timestamp: Date.now() },
        ]
        state.historyIndex = 0
      }),

    serialize: () => {
      const state = get()
      return JSON.stringify({
        modelId: state.modelId,
        bones: state.bones,
        history: state.history,
      })
    },

    deserialize: (json) => {
      try {
        const parsed = JSON.parse(json)
        set((state) => {
          state.modelId = parsed.modelId || null
          state.bones = parsed.bones || {}
          state.history = parsed.history || [{ bones: {}, timestamp: Date.now() }]
          state.historyIndex = state.history.length - 1
        })
      } catch (e) {
        console.error('Failed to deserialize pose state:', e)
      }
    },
  }))
)
