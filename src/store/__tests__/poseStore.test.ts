/**
 * PoseMaster – src/store/__tests__/poseStore.test.ts
 * Unit tests for Zustand pose store (undo/redo, serialization)
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { usePoseStore, BoneRotation } from '../poseStore'

describe('poseStore', () => {
  beforeEach(() => {
    usePoseStore.getState().clearHistory()
    usePoseStore.getState().setModelId(null)
  })

  it('should initialize with empty bones', () => {
    expect(usePoseStore.getState().bones).toEqual({})
  })

  it('should set bone rotation', () => {
    const store = usePoseStore.getState()
    store.setBoneRotation('Hips', { x: 45, y: 90, z: 0 })
    expect(usePoseStore.getState().bones.Hips).toEqual({ x: 45, y: 90, z: 0 })
  })

  it('should support undo', () => {
    const store = usePoseStore.getState()
    store.setBoneRotation('Arm', { x: 90, y: 0, z: 0 })
    expect(usePoseStore.getState().canUndo()).toBe(true)
    store.undo()
    expect(usePoseStore.getState().bones.Arm).toBeUndefined()
  })

  it('should support redo', () => {
    const store = usePoseStore.getState()
    store.setBoneRotation('Leg', { x: 45, y: 30, z: 0 })
    store.undo()
    store.redo()
    expect(usePoseStore.getState().bones.Leg).toEqual({ x: 45, y: 30, z: 0 })
  })

  it('should reset pose', () => {
    const store = usePoseStore.getState()
    store.setBoneRotation('Spine', { x: 25, y: 0, z: 0 })
    store.resetPose()
    expect(usePoseStore.getState().bones).toEqual({})
  })

  it('should serialize and deserialize', () => {
    const store = usePoseStore.getState()
    store.setModelId('test-model')
    store.setBoneRotation('Neck', { x: 15, y: 45, z: 0 })
    const json = store.serialize()
    
    store.clearHistory()
    store.setModelId(null)
    store.deserialize(json)
    
    expect(usePoseStore.getState().modelId).toBe('test-model')
    expect(usePoseStore.getState().bones.Neck).toEqual({ x: 15, y: 45, z: 0 })
  })

  it('should handle undo/redo history', () => {
    const store = usePoseStore.getState()
    expect(store.canUndo()).toBe(false)
    expect(store.canRedo()).toBe(false)
    
    store.setBoneRotation('Head', { x: 10, y: 0, z: 0 })
    expect(usePoseStore.getState().canUndo()).toBe(true)
    
    store.undo()
    expect(usePoseStore.getState().canRedo()).toBe(true)
  })
})
