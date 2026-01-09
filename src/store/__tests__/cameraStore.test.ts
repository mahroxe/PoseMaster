/**
 * PoseMaster – src/store/__tests__/cameraStore.test.ts
 * Unit tests for Zustand camera store (snapshots, serialization)
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { useCameraStore } from '../cameraStore'

describe('cameraStore', () => {
  beforeEach(() => {
    useCameraStore.getState().reset()
  })

  it('should initialize with default values', () => {
    const state = useCameraStore.getState()
    expect(state.position).toEqual({ x: 0, y: 0, z: 5 })
    expect(state.fov).toBe(75)
  })

  it('should set camera position', () => {
    const store = useCameraStore.getState()
    store.setPosition(10, 15, 20)
    expect(useCameraStore.getState().position).toEqual({ x: 10, y: 15, z: 20 })
  })

  it('should set camera target', () => {
    const store = useCameraStore.getState()
    store.setTarget(5, 2, 0)
    expect(useCameraStore.getState().target).toEqual({ x: 5, y: 2, z: 0 })
  })

  it('should clamp FOV between 1 and 179', () => {
    const store = useCameraStore.getState()
    store.setFOV(0)
    expect(useCameraStore.getState().fov).toBe(1)
    store.setFOV(200)
    expect(useCameraStore.getState().fov).toBe(179)
  })

  it('should toggle grid', () => {
    const store = useCameraStore.getState()
    expect(useCameraStore.getState().gridVisible).toBe(true)
    store.toggleGrid()
    expect(useCameraStore.getState().gridVisible).toBe(false)
  })

  it('should save and load snapshots', () => {
    const store = useCameraStore.getState()
    store.setPosition(5, 6, 7)
    store.setFOV(90)
    store.saveSnapshot('test-view')
    
    store.setPosition(0, 0, 0)
    store.loadSnapshot('test-view')
    
    const state = useCameraStore.getState()
    expect(state.position).toEqual({ x: 5, y: 6, z: 7 })
    expect(state.fov).toBe(90)
  })

  it('should list snapshots', () => {
    const store = useCameraStore.getState()
    store.saveSnapshot('view1')
    store.saveSnapshot('view2')
    const list = useCameraStore.getState().listSnapshots()
    expect(list).toContain('view1')
    expect(list).toContain('view2')
  })

  it('should delete snapshot', () => {
    const store = useCameraStore.getState()
    store.saveSnapshot('temp')
    expect(useCameraStore.getState().snapshots['temp']).toBeDefined()
    store.deleteSnapshot('temp')
    expect(useCameraStore.getState().snapshots['temp']).toBeUndefined()
  })

  it('should serialize and deserialize', () => {
    const store = useCameraStore.getState()
    store.setPosition(3, 4, 5)
    store.setFOV(60)
    const json = store.serialize()
    
    store.reset()
    store.deserialize(json)
    
    const state = useCameraStore.getState()
    expect(state.position).toEqual({ x: 3, y: 4, z: 5 })
    expect(state.fov).toBe(60)
  })

  it('should handle FOV clamping on serialization', () => {
    const store = useCameraStore.getState()
    store.setFOV(150)
    const json = store.serialize()
    store.reset()
    store.deserialize(json)
    expect(useCameraStore.getState().fov).toBe(150)
  })
})
