/**
 * PoseMaster – src/engine/__tests__/CameraManager.test.ts
 * 
 * Unit tests for CameraManager (no DOM required)
 */

import { describe, it, expect, beforeEach } from 'vitest'
import * as THREE from 'three'
import { CameraManager } from '../CameraManager'

describe('CameraManager', () => {
  let cameraManager: CameraManager

  beforeEach(() => {
    cameraManager = new CameraManager(1920, 1080)
  })

  it('should create a perspective camera', () => {
    const camera = cameraManager.getCamera()
    expect(camera).toBeInstanceOf(THREE.PerspectiveCamera)
  })

  it('should update size and aspect ratio', () => {
    const camera = cameraManager.getCamera()
    const initialAspect = camera.aspect

    cameraManager.setSize(1024, 768)
    expect(camera.aspect).toBeCloseTo(1024 / 768, 5)
    expect(camera.aspect).not.toBe(initialAspect)
  })

  it('should set and get position', () => {
    cameraManager.setPosition(5, 10, 15)
    const pos = cameraManager.getPosition()

    expect(pos.x).toBeCloseTo(5, 5)
    expect(pos.y).toBeCloseTo(10, 5)
    expect(pos.z).toBeCloseTo(15, 5)
  })

  it('should set and get target', () => {
    cameraManager.setTarget(1, 2, 3)
    const target = cameraManager.getTarget()

    expect(target.x).toBeCloseTo(1, 5)
    expect(target.y).toBeCloseTo(2, 5)
    expect(target.z).toBeCloseTo(3, 5)
  })

  it('should set and get FOV', () => {
    cameraManager.setFOV(60)
    expect(cameraManager.getFOV()).toBe(60)

    cameraManager.setFOV(120)
    expect(cameraManager.getFOV()).toBe(120)
  })

  it('should clamp FOV values', () => {
    cameraManager.setFOV(0) // Too low
    expect(cameraManager.getFOV()).toBe(1)

    cameraManager.setFOV(180) // Too high
    expect(cameraManager.getFOV()).toBe(179)
  })

  it('should save and load camera states', () => {
    cameraManager.setPosition(5, 10, 15)
    cameraManager.setFOV(60)
    cameraManager.saveState('view1')

    cameraManager.setPosition(0, 0, 0)
    cameraManager.setFOV(90)

    const loaded = cameraManager.loadState('view1')
    expect(loaded).toBe(true)

    const pos = cameraManager.getPosition()
    expect(pos.x).toBeCloseTo(5, 5)
    expect(cameraManager.getFOV()).toBe(60)
  })

  it('should list saved states', () => {
    cameraManager.saveState('front')
    cameraManager.saveState('top')
    cameraManager.saveState('side')

    const names = cameraManager.getSavedStateNames()
    expect(names).toContain('front')
    expect(names).toContain('top')
    expect(names).toContain('side')
    expect(names.length).toBe(3)
  })

  it('should delete saved states', () => {
    cameraManager.saveState('temp')
    cameraManager.deleteSavedState('temp')

    const names = cameraManager.getSavedStateNames()
    expect(names).not.toContain('temp')
  })

  it('should get camera state snapshot', () => {
    cameraManager.setPosition(5, 10, 15)
    cameraManager.setTarget(0, 0, 0)
    cameraManager.setFOV(75)

    const state = cameraManager.getState()
    expect(state.position.x).toBeCloseTo(5, 5)
    expect(state.target.x).toBeCloseTo(0, 5)
    expect(state.fov).toBe(75)
  })

  it('should restore from snapshot', () => {
    cameraManager.setPosition(5, 10, 15)
    const originalState = cameraManager.getState()

    cameraManager.setPosition(0, 0, 0)
    cameraManager.setState(originalState)

    const pos = cameraManager.getPosition()
    expect(pos.x).toBeCloseTo(5, 5)
  })

  it('should reset to default view', () => {
    cameraManager.setPosition(100, 200, 300)
    cameraManager.setFOV(120)

    cameraManager.reset()

    const pos = cameraManager.getPosition()
    expect(pos.z).toBeCloseTo(5, 5)
    expect(cameraManager.getFOV()).toBe(75)
  })

  it('should set clip planes', () => {
    cameraManager.setClipPlanes(0.5, 2000)
    const camera = cameraManager.getCamera()
    expect(camera.near).toBeCloseTo(0.5, 5)
    expect(camera.far).toBeCloseTo(2000, 5)
  })
})
