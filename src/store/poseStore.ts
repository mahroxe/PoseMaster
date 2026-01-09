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
 * ☐ Stores bone rotations (Euler degrees)
 * ☐ Tracks active model ID
 * ☐ Undo/redo history (Immer + snapshots)
 * ☐ Serializable to JSON
 * ☐ No Three.js objects
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface BoneRotation {
  x: number
  y: number
  z: number
}

export interface PoseState {
  modelId: string | null
  bones: Record<string, BoneRotation>
  history: Array<Record<string, BoneRotation>>
  historyIndex: number

  setBoneRotation: (boneName: string, rotation: BoneRotation) => void
  resetPose: () => void
  undo: () => void
  redo: () => void
  loadPose: (pose: Record<string, BoneRotation>) => void
}

export const usePoseStore = create<PoseState>()(
  immer((set) => ({
    modelId: null,
    bones: {},
    history: [{}],
    historyIndex: 0,

    setBoneRotation: (boneName, rotation) =>
      set((state) => {
        state.bones[boneName] = rotation
      }),

    resetPose: () =>
      set((state) => {
        state.bones = {}
      }),

    undo: () =>
      set((state) => {
        if (state.historyIndex > 0) {
          state.historyIndex--
          state.bones = state.history[state.historyIndex]
        }
      }),

    redo: () =>
      set((state) => {
        if (state.historyIndex < state.history.length - 1) {
          state.historyIndex++
          state.bones = state.history[state.historyIndex]
        }
      }),

    loadPose: (pose) =>
      set((state) => {
        state.bones = pose
      }),
  }))
)
