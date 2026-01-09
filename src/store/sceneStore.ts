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
 * PoseMaster – src/store/sceneStore.ts
 * 
 * ☐ Active props list (with transforms)
 * ☐ Reference images (url, position, opacity)
 * ☐ Scene-level flags (grid visible, etc.)
 * ☐ Fully serializable
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface Prop {
  id: string
  name: string
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: number
}

export interface ReferenceImage {
  id: string
  url: string
  position: { x: number; y: number; z: number }
  scale: number
  opacity: number
}

export interface SceneState {
  props: Prop[]
  referenceImages: ReferenceImage[]
  activeModelId: string | null

  addProp: (prop: Prop) => void
  removeProp: (id: string) => void
  updateProp: (id: string, updates: Partial<Prop>) => void
  addReferenceImage: (image: ReferenceImage) => void
  removeReferenceImage: (id: string) => void
  updateReferenceImage: (id: string, updates: Partial<ReferenceImage>) => void
}

export const useSceneStore = create<SceneState>()(
  immer((set) => ({
    props: [],
    referenceImages: [],
    activeModelId: null,

    addProp: (prop) =>
      set((state) => {
        state.props.push(prop)
      }),

    removeProp: (id) =>
      set((state) => {
        state.props = state.props.filter((p) => p.id !== id)
      }),

    updateProp: (id, updates) =>
      set((state) => {
        const prop = state.props.find((p) => p.id === id)
        if (prop) {
          Object.assign(prop, updates)
        }
      }),

    addReferenceImage: (image) =>
      set((state) => {
        state.referenceImages.push(image)
      }),

    removeReferenceImage: (id) =>
      set((state) => {
        state.referenceImages = state.referenceImages.filter((img) => img.id !== id)
      }),

    updateReferenceImage: (id, updates) =>
      set((state) => {
        const image = state.referenceImages.find((img) => img.id === id)
        if (image) {
          Object.assign(image, updates)
        }
      }),
  }))
)
