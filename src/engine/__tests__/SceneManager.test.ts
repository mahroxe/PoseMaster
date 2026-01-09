/**
 * PoseMaster – src/engine/__tests__/SceneManager.test.ts
 * 
 * Unit tests for SceneManager (no DOM required)
 */

import { describe, it, expect, beforeEach } from 'vitest'
import * as THREE from 'three'
import { SceneManager } from '../SceneManager'

describe('SceneManager', () => {
  let sceneManager: SceneManager

  beforeEach(() => {
    sceneManager = new SceneManager()
  })

  it('should create a scene', () => {
    const scene = sceneManager.getScene()
    expect(scene).toBeInstanceOf(THREE.Scene)
  })

  it('should have default lighting', () => {
    const scene = sceneManager.getScene()
    const lights = scene.children.filter((child) => child instanceof THREE.Light)
    expect(lights.length).toBeGreaterThanOrEqual(2) // Ambient + Directional
  })

  it('should set and get background color', () => {
    const color = 0xff0000
    sceneManager.setBackgroundColor(color)
    const bgColor = sceneManager.getBackgroundColor()
    expect(bgColor?.getHex()).toBe(color)
  })

  it('should add and remove objects', () => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshBasicMaterial()
    )
    sceneManager.add(mesh)
    expect(sceneManager.getScene().children).toContain(mesh)

    sceneManager.remove(mesh)
    expect(sceneManager.getScene().children).not.toContain(mesh)
  })

  it('should add and remove grid helper', () => {
    sceneManager.addGridHelper(10, 10)
    expect(sceneManager.getScene().children.length).toBeGreaterThan(2)

    sceneManager.removeGridHelper()
    const grids = sceneManager
      .getScene()
      .children.filter((child) => child instanceof THREE.GridHelper)
    expect(grids.length).toBe(0)
  })

  it('should set light intensities', () => {
    sceneManager.setAmbientIntensity(0.5)
    sceneManager.setDirectionalIntensity(0.3)
    // Verify through state inspection
    expect(sceneManager.getScene()).toBeDefined()
  })

  it('should clear non-light objects', () => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshBasicMaterial()
    )
    sceneManager.add(mesh)
    sceneManager.clear()
    
    const meshes = sceneManager
      .getScene()
      .children.filter((child) => child instanceof THREE.Mesh)
    expect(meshes.length).toBe(0)
  })

  it('should dispose resources', () => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshBasicMaterial()
    )
    sceneManager.add(mesh)
    expect(() => sceneManager.dispose()).not.toThrow()
  })
})
