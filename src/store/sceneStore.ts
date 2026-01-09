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
 * ✓ Active props list (with transforms)
 * ✓ Reference images (url, position, opacity)
 * ✓ Scene-level flags (grid visible, etc.)
 * ✓ Fully serializable
 * ✓ No Three.js objects
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface Prop {
  id: string
  name: string
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: number
  visible?: boolean
}

export interface ReferenceImage {
  id: string
  url: string
  position: { x: number; y: number; z: number }
  scale: number
  opacity: number
  visible?: boolean
}

export interface SceneState {
  props: Prop[]
  referenceImages: ReferenceImage[]
  activeModelId: string | null
  backgroundColor: string
  backgroundOpacity: number

  addProp: (prop: Prop) => void
  removeProp: (id: string) => void
  updateProp: (id: string, updates: Partial<Prop>) => void
  getProp: (id: string) => Prop | undefined
  addReferenceImage: (image: ReferenceImage) => void
  removeReferenceImage: (id: string) => void
  updateReferenceImage: (id: string, updates: Partial<ReferenceImage>) => void
  getReferenceImage: (id: string) => ReferenceImage | undefined
  setActiveModel: (id: string | null) => void
  setBackgroundColor: (color: string) => void
  setBackgroundOpacity: (opacity: number) => void
  clearScene: () => void
  serialize: () => string
  deserialize: (json: string) => void
}

export const useSceneStore = create<SceneState>()(
  immer((set, get) => ({
    props: [],
    referenceImages: [],
    activeModelId: null,
    backgroundColor: '#ffffff',
    backgroundOpacity: 1,

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

    getProp: (id) => {
      return get().props.find((p) => p.id === id)
    },

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

    getReferenceImage: (id) => {
      return get().referenceImages.find((img) => img.id === id)
    },

    setActiveModel: (id) =>
      set((state) => {
        state.activeModelId = id
      }),

    setBackgroundColor: (color) =>
      set((state) => {
        state.backgroundColor = color
      }),

    setBackgroundOpacity: (opacity) =>
      set((state) => {
        state.backgroundOpacity = Math.max(0, Math.min(1, opacity))
      }),

    clearScene: () =>
      set((state) => {
        state.props = []
        state.referenceImages = []
        state.activeModelId = null
      }),

    serialize: () => {
      const state = get()
      return JSON.stringify({
        props: state.props,
        referenceImages: state.referenceImages,
        activeModelId: state.activeModelId,
        backgroundColor: state.backgroundColor,
        backgroundOpacity: state.backgroundOpacity,
      })
    },

    deserialize: (json: string) => {
      try {
        const parsed = JSON.parse(json)
        set((state) => {
          state.props = parsed.props || []
          state.referenceImages = parsed.referenceImages || []
          state.activeModelId = parsed.activeModelId || null
          state.backgroundColor = parsed.backgroundColor || '#ffffff'
          state.backgroundOpacity = parsed.backgroundOpacity || 1
        })
      } catch (e) {
        console.error('Failed to deserialize scene state:', e)
      }
    },
  }))
)
