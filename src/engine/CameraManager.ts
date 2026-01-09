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
 * PoseMaster – src/engine/CameraManager.ts
 * 
 * ~~☐ Creates PerspectiveCamera~~
 * ~~☐ Implements save/load camera states~~
 * ☐ Handles FOV, near/far, aspect
 * ☐ No OrbitControls (that's UI layer)
 */

import * as THREE from 'three'

export interface CameraStateSnapshot {
  position: { x: number; y: number; z: number }
  target: { x: number; y: number; z: number }
  fov: number
  near: number
  far: number
  aspect: number
}

export class CameraManager {
  private camera: THREE.PerspectiveCamera
  private target: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  private savedStates: Map<string, CameraStateSnapshot> = new Map()

  constructor(width: number, height: number, fov: number = 75) {
    this.camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000)
    this.camera.position.set(0, 0, 5)
    this.camera.lookAt(this.target)
  }

  /**
   * Get the underlying Three.js camera
   */
  getCamera(): THREE.PerspectiveCamera {
    return this.camera
  }

  /**
   * Update camera aspect ratio and projection
   */
  setSize(width: number, height: number): void {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  /**
   * Set camera position
   */
  setPosition(x: number, y: number, z: number): void {
    this.camera.position.set(x, y, z)
  }

  /**
   * Get camera position
   */
  getPosition(): THREE.Vector3 {
    return this.camera.position.clone()
  }

  /**
   * Set camera look-at target
   */
  setTarget(x: number, y: number, z: number): void {
    this.target.set(x, y, z)
    this.camera.lookAt(this.target)
  }

  /**
   * Get camera target
   */
  getTarget(): THREE.Vector3 {
    return this.target.clone()
  }

  /**
   * Set field of view
   */
  setFOV(fov: number): void {
    this.camera.fov = Math.max(1, Math.min(179, fov))
    this.camera.updateProjectionMatrix()
  }

  /**
   * Get field of view
   */
  getFOV(): number {
    return this.camera.fov
  }

  /**
   * Set near/far clipping planes
   */
  setClipPlanes(near: number, far: number): void {
    this.camera.near = Math.max(0.01, near)
    this.camera.far = Math.max(this.camera.near + 1, far)
    this.camera.updateProjectionMatrix()
  }

  /**
   * Get current camera state snapshot
   */
  getState(): CameraStateSnapshot {
    const pos = this.camera.position
    return {
      position: { x: pos.x, y: pos.y, z: pos.z },
      target: { x: this.target.x, y: this.target.y, z: this.target.z },
      fov: this.camera.fov,
      near: this.camera.near,
      far: this.camera.far,
      aspect: this.camera.aspect,
    }
  }

  /**
   * Restore camera state from snapshot
   */
  setState(state: CameraStateSnapshot): void {
    this.camera.position.set(state.position.x, state.position.y, state.position.z)
    this.target.set(state.target.x, state.target.y, state.target.z)
    this.camera.fov = state.fov
    this.camera.near = state.near
    this.camera.far = state.far
    this.camera.aspect = state.aspect
    this.camera.lookAt(this.target)
    this.camera.updateProjectionMatrix()
  }

  /**
   * Save camera state with name
   */
  saveState(name: string): void {
    this.savedStates.set(name, this.getState())
  }

  /**
   * Load named camera state
   */
  loadState(name: string): boolean {
    const state = this.savedStates.get(name)
    if (state) {
      this.setState(state)
      return true
    }
    return false
  }

  /**
   * Get list of saved state names
   */
  getSavedStateNames(): string[] {
    return Array.from(this.savedStates.keys())
  }

  /**
   * Delete saved state
   */
  deleteSavedState(name: string): void {
    this.savedStates.delete(name)
  }

  /**
   * Frame a mesh/bounding box in view
   */
  frameObject(object: THREE.Object3D, distance: number = 5): void {
    const box = new THREE.Box3().setFromObject(object)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const fov = this.camera.fov * (Math.PI / 180)
    let cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2)) + distance

    this.camera.position.set(center.x, center.y, center.z + cameraZ)
    this.setTarget(center.x, center.y, center.z)
  }

  /**
   * Reset camera to default view
   */
  reset(): void {
    this.camera.position.set(0, 0, 5)
    this.target.set(0, 0, 0)
    this.camera.fov = 75
    this.camera.lookAt(this.target)
    this.camera.updateProjectionMatrix()
  }
}
